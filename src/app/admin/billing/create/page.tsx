'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Receipt, Plus, Search, Eye, Download, Save, RefreshCw,
  CheckCircle2, Building2, Calendar, FileText, Sparkles,
  ChevronDown, Bell, ArrowLeft, Layers, Shield, Briefcase
} from 'lucide-react';
import { fetchAdmin } from '@/lib/admin-client';
import type { ServiceRecord, ProjectRecord } from '@/lib/admin-db';
import { amountToWordsIndian } from '@/lib/currency-words';

export default function CreateInvoicePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedProjectId = searchParams.get('projectId');

  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('Healthcare Technology System (HE-2026-01)');
  const [clientName, setClientName] = useState<string>('Holistic Edge Chiropractic & Wellness Clinic');
  const [clientAddress, setClientAddress] = useState<string>('123 Wellness Drive, Green Park\nRiyadh 12345, Saudi Arabia');
  const [clientEmail, setClientEmail] = useState<string>('info@holisticedgeclinic.com');
  const [clientPhone, setClientPhone] = useState<string>('+966 50 123 4567');
  const [invoiceDate, setInvoiceDate] = useState<string>('2026-09-30');
  const [dueDate, setDueDate] = useState<string>('2026-10-14');
  const [paymentTerms, setPaymentTerms] = useState<string>('14 Days');
  const [currency, setCurrency] = useState<string>('INR (₹)');
  const [serviceSearch, setServiceSearch] = useState<string>('');

  // Selected Services & Manual Amounts
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [serviceAmounts, setServiceAmounts] = useState<Record<string, number>>({});
  const [customServices, setCustomServices] = useState<Array<{ id: string; name: string; description: string; amount: number }>>([]);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [newCustom, setNewCustom] = useState({ name: '', description: '', amount: 20000 });

  // Commercials
  const [discount, setDiscount] = useState<number>(0);
  const [taxPct, setTaxPct] = useState<number>(0);

  // Action states
  const [generating, setGenerating] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const previewRef = useRef<HTMLDivElement>(null);

  // Load projects and services library
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [projRes, srvRes] = await Promise.all([
          fetchAdmin('/api/admin/projects'),
          fetchAdmin('/api/admin/services'),
        ]);

        const projData = await projRes.json();
        const srvData = await srvRes.json();

        const loadedProjects = projData.data || [];
        const loadedServices = srvData.data || [];

        setProjects(loadedProjects);
        setServices(loadedServices);

        // Check if preselected project is present
        if (preselectedProjectId) {
          const match = loadedProjects.find((p: any) => p.id === preselectedProjectId || p.projectRef === preselectedProjectId);
          if (match) {
            setSelectedProjectId(match.id);
            setProjectName(`${match.name} (${match.projectRef || 'PRJ'})`);
            setClientName(match.clientName);
          }
        } else if (loadedProjects.length > 0) {
          // Default selection
          const p = loadedProjects[0];
          setSelectedProjectId(p.id);
          setProjectName(`${p.name} (${p.projectRef || 'PRJ'})`);
          setClientName(p.clientName);
        }

        // Initialize default selected services as in Reference 2:
        // Website Design (35k), Admin Panel (45k), Backend & Database (25k), Authentication (10k), Deployment (15k)
        const initialIds: string[] = [];
        const initialAmounts: Record<string, number> = {};

        const defaultSelections: Record<string, number> = {
          'Website Design & Development': 35000,
          'Admin / Reception Panel': 45000,
          'Backend Development': 25000,
          'Authentication System': 10000,
          'Deployment & Configuration': 15000,
        };

        loadedServices.forEach((srv: ServiceRecord) => {
          if (defaultSelections[srv.name]) {
            initialIds.push(srv.id);
            initialAmounts[srv.id] = defaultSelections[srv.name];
          }
        });

        setSelectedServiceIds(initialIds);
        setServiceAmounts(initialAmounts);
      } catch (err) {
        console.error('Error loading initial billing data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [preselectedProjectId]);

  const handleProjectSelect = (projId: string) => {
    setSelectedProjectId(projId);
    const p = projects.find((proj) => proj.id === projId);
    if (p) {
      setProjectName(`${p.name} (${p.projectRef || 'PRJ'})`);
      setClientName(p.clientName);
    }
  };

  const toggleService = (srvId: string) => {
    if (selectedServiceIds.includes(srvId)) {
      setSelectedServiceIds(selectedServiceIds.filter((id) => id !== srvId));
    } else {
      setSelectedServiceIds([...selectedServiceIds, srvId]);
      if (serviceAmounts[srvId] === undefined) {
        setServiceAmounts({ ...serviceAmounts, [srvId]: 25000 });
      }
    }
  };

  const handleAmountChange = (srvId: string, amt: number) => {
    setServiceAmounts({
      ...serviceAmounts,
      [srvId]: Math.max(0, amt),
    });
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustom.name) return;
    const customId = `custom_${Date.now()}`;
    setCustomServices([...customServices, { id: customId, ...newCustom }]);
    setSelectedServiceIds([...selectedServiceIds, customId]);
    setServiceAmounts({ ...serviceAmounts, [customId]: newCustom.amount });
    setNewCustom({ name: '', description: '', amount: 20000 });
    setShowCustomModal(false);
  };

  // Compile active selected line items
  const activeLineItems = useMemo(() => {
    const items: Array<{ id: string; serviceName: string; description: string; qty: number; rate: number; amount: number }> = [];

    // From service library
    services.forEach((s) => {
      if (selectedServiceIds.includes(s.id)) {
        const amt = serviceAmounts[s.id] || 0;
        items.push({
          id: s.id,
          serviceName: s.name,
          description: s.description,
          qty: 1,
          rate: amt,
          amount: amt,
        });
      }
    });

    // From custom services
    customServices.forEach((cs) => {
      if (selectedServiceIds.includes(cs.id)) {
        const amt = serviceAmounts[cs.id] || cs.amount || 0;
        items.push({
          id: cs.id,
          serviceName: cs.name,
          description: cs.description,
          qty: 1,
          rate: amt,
          amount: amt,
        });
      }
    });

    return items;
  }, [services, selectedServiceIds, serviceAmounts, customServices]);

  // Totals calculations
  const subtotal = useMemo(() => {
    return activeLineItems.reduce((sum, it) => sum + it.amount, 0);
  }, [activeLineItems]);

  const taxAmount = useMemo(() => {
    return Math.round((subtotal - discount) * (taxPct / 100));
  }, [subtotal, discount, taxPct]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount + taxAmount);
  }, [subtotal, discount, taxAmount]);

  const words = useMemo(() => {
    return amountToWordsIndian(total);
  }, [total]);

  // Filter services by search
  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
    s.description.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  // Actions
  const handleSaveDraft = async () => {
    try {
      setSavingDraft(true);
      const payload = {
        projectId: selectedProjectId || null,
        clientName,
        clientAddress,
        clientEmail,
        clientPhone,
        invoiceDate,
        dueDate,
        paymentTerms,
        currency,
        subtotal,
        discount,
        taxPct,
        taxAmount,
        total,
        amountInWords: words,
        status: 'DRAFT',
        items: activeLineItems,
      };

      const res = await fetchAdmin('/api/admin/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setActionMessage('Draft invoice saved successfully.');
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error('Failed to save draft:', err);
    } finally {
      setSavingDraft(false);
    }
  };

  const handleGenerateAndDownload = async () => {
    try {
      setGenerating(true);
      const payload = {
        projectId: selectedProjectId || null,
        clientName,
        clientAddress,
        clientEmail,
        clientPhone,
        invoiceDate,
        dueDate,
        paymentTerms,
        currency,
        subtotal,
        discount,
        taxPct,
        taxAmount,
        total,
        amountInWords: words,
        status: 'SENT',
        items: activeLineItems,
      };

      // 1. Create invoice in DB and Google Sheets (which also triggers Drive upload!)
      const res = await fetchAdmin('/api/admin/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to create invoice record');
      const data = await res.json();
      const invoiceId = data.data.id;

      // 2. Trigger PDF download
      const pdfRes = await fetchAdmin(`/api/admin/invoices/${invoiceId}/pdf`);
      if (!pdfRes.ok) throw new Error('Failed to download PDF buffer');

      const blob = await pdfRes.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.data.invoiceNumber || 'INV-2026-001'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setActionMessage('Invoice generated, uploaded to Google Drive & downloaded successfully!');
      setTimeout(() => setActionMessage(null), 4000);
    } catch (err) {
      console.error('Error generating and downloading invoice:', err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-6">
      {/* Top Breadcrumbs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
          <Link href="/admin/billing" className="hover:text-[#1463FF]">Billing</Link>
          <span>/</span>
          <span className="font-bold text-[#0B132B]">Create Invoice</span>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects, clients..."
              className="bg-white border border-[#E8E4DC] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#0B132B] w-56 focus:outline-none focus:border-[#1463FF]"
            />
          </div>
          <button className="p-2 rounded-xl bg-white border border-[#E8E4DC] text-[#64748B]">
            <Bell className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#0B132B] text-white flex items-center justify-center font-bold text-xs">
            AA
          </div>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-mono font-bold text-emerald-800 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Main 2-column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Controls (5.5 cols / 12) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E8E4DC] p-6 space-y-6 shadow-sm">
          <div>
            <h1 className="font-bold text-xl text-[#0B132B]">Create Invoice</h1>
            <p className="text-xs text-[#64748B] mt-0.5">Select project, choose services, set amounts and generate your invoice.</p>
          </div>

          {/* Section 1: Project & Client Details */}
          <div className="space-y-4 pt-2 border-t border-[#F1EDE4]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B132B]">
              <div className="w-6 h-6 rounded-lg bg-[#EDF4FF] text-[#1463FF] flex items-center justify-center">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <span>1. Project & Client Details</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#64748B] font-medium block mb-1">Project Name *</label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => handleProjectSelect(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs text-[#0B132B] font-semibold focus:outline-none focus:border-[#1463FF]"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.projectRef || 'PRJ'})
                    </option>
                  ))}
                  {projects.length === 0 && (
                    <option value="">Healthcare Technology System (HE-2026-01)</option>
                  )}
                </select>
              </div>

              <div>
                <label className="text-[#64748B] font-medium block mb-1">Client / Company Name *</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs text-[#0B132B] font-semibold focus:outline-none focus:border-[#1463FF]"
                />
              </div>

              <div>
                <label className="text-[#64748B] font-medium block mb-1">Client Address *</label>
                <textarea
                  rows={2}
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl p-3 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Invoice Details */}
          <div className="space-y-4 pt-2 border-t border-[#F1EDE4]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B132B]">
              <div className="w-6 h-6 rounded-lg bg-[#EDF4FF] text-[#1463FF] flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span>2. Invoice Details</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[#64748B] font-medium block mb-1">Invoice Date *</label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                />
              </div>
              <div>
                <label className="text-[#64748B] font-medium block mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Select Services */}
          <div className="space-y-4 pt-2 border-t border-[#F1EDE4]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B132B]">
                <div className="w-6 h-6 rounded-lg bg-[#EDF4FF] text-[#1463FF] flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span>3. Select Services</span>
              </div>
              <span className="text-[11px] text-[#64748B]">Choose services for this invoice</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services..."
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
              />
            </div>

            {/* Service count badge */}
            {services.length > 0 && (
              <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                <span>{filteredServices.length} of {services.length} services</span>
                {selectedServiceIds.filter(id => services.some(s => s.id === id)).length > 0 && (
                  <span className="text-[#1463FF] font-bold">
                    {selectedServiceIds.filter(id => services.some(s => s.id === id)).length} selected
                  </span>
                )}
              </div>
            )}

            <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
              {loading ? (
                <div className="py-6 text-center">
                  <div className="w-5 h-5 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <span className="text-[11px] font-mono text-[#94A3B8]">Loading service library...</span>
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="py-6 text-center border border-dashed border-[#E8E4DC] rounded-xl">
                  <Search className="w-5 h-5 text-[#D8D4C9] mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-[#0B132B]">No services match &ldquo;{serviceSearch}&rdquo;</p>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Try a different keyword or add a custom service below.</p>
                </div>
              ) : (
                filteredServices.map((srv) => {
                  const checked = selectedServiceIds.includes(srv.id);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        checked
                          ? 'bg-[#EDF4FF]/60 border-[#1463FF] shadow-sm shadow-[#1463FF]/10'
                          : 'bg-[#FDFBF7] border-[#E8E4DC] hover:border-[#D8D4C9] hover:bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {}}
                        className="mt-0.5 accent-[#1463FF] rounded shrink-0"
                      />
                      <div className="space-y-0.5 min-w-0">
                        <span className={`font-bold text-xs block ${checked ? 'text-[#1463FF]' : 'text-[#0B132B]'}`}>{srv.name}</span>
                        <p className="text-[10.5px] text-[#64748B] leading-tight">{srv.description}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowCustomModal(true)}
              className="w-full py-2 border border-dashed border-[#1463FF] text-[#1463FF] text-xs font-mono font-bold rounded-xl hover:bg-[#EDF4FF]/30 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Custom Service
            </button>
          </div>

          {/* Section 4: Set Amounts */}
          <div className="space-y-4 pt-2 border-t border-[#F1EDE4]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B132B]">
              <div className="w-6 h-6 rounded-lg bg-[#EDF4FF] text-[#1463FF] flex items-center justify-center">
                <Receipt className="w-3.5 h-3.5" />
              </div>
              <span>4. Set Amounts</span>
            </div>
            <p className="text-[11px] text-[#64748B]">Enter the manual amount for each selected service.</p>

            <div className="space-y-2.5">
              {activeLineItems.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 bg-[#FDFBF7] border border-[#E8E4DC] rounded-xl p-2.5">
                  <span className="w-6 text-center font-mono font-bold text-xs text-[#64748B]">{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-xs text-[#0B132B] block truncate">{item.serviceName}</span>
                  </div>
                  <div className="w-32 flex items-center gap-1">
                    <span className="font-mono text-xs text-[#64748B]">₹</span>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={item.amount}
                      onChange={(e) => handleAmountChange(item.id, parseFloat(e.target.value) || 0)}
                      className="w-full bg-white border border-[#D8D4C9] rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-[#0B132B] text-right focus:outline-none focus:border-[#1463FF]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Discount & Tax */}
          <div className="space-y-4 pt-2 border-t border-[#F1EDE4]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B132B]">
              <div className="w-6 h-6 rounded-lg bg-[#EDF4FF] text-[#1463FF] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span>5. Discount & Tax</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[#64748B] font-medium block mb-1">Discount (INR)</label>
                <input
                  type="number"
                  min="0"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                />
              </div>
              <div>
                <label className="text-[#64748B] font-medium block mb-1">Tax (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={taxPct}
                  onChange={(e) => setTaxPct(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons Bar */}
          <div className="pt-4 border-t border-[#E8E4DC] flex items-center gap-3">
            <button
              type="button"
              onClick={() => previewRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-1 py-2.5 rounded-xl border border-[#E8E4DC] text-[#64748B] hover:text-[#0B132B] hover:border-[#1463FF] text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
            <button
              type="button"
              disabled={savingDraft}
              onClick={handleSaveDraft}
              className="flex-1 py-2.5 rounded-xl border border-[#D8D4C9] bg-[#FDFBF7] text-[#0B132B] hover:bg-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" /> Save Draft
            </button>
            <button
              type="button"
              disabled={generating}
              onClick={handleGenerateAndDownload}
              className="flex-[1.5] py-2.5 rounded-xl bg-[#1463FF] hover:bg-[#004AD6] text-white text-xs font-mono font-bold transition-all shadow-md shadow-[#1463FF]/20 flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" /> {generating ? 'Generating PDF...' : 'Generate & Download PDF'}
            </button>
          </div>
        </div>

        {/* Right Column: Live Invoice Preview (Matching Reference 2 & 3) */}
        <div ref={previewRef} className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg text-[#0B132B]">Invoice Preview</h2>
              <p className="text-xs text-[#64748B]">This is how your invoice will look. Review and generate the PDF.</p>
            </div>
            <button
              onClick={() => previewRef.current?.classList.add('animate-pulse')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8E4DC] bg-white text-xs font-mono font-bold text-[#1463FF] hover:bg-[#FDFBF7]"
            >
              <RefreshCw className="w-3 h-3" /> Refresh Preview
            </button>
          </div>

          {/* Rendered Invoice Paper (Matching Reference 3) */}
          <div className="bg-[#FDFBF7] rounded-2xl border border-[#E8E4DC] p-7 shadow-lg space-y-6 text-[#0B132B]">
            {/* Header: Logo & Slogans */}
            <div className="flex items-start justify-between border-b border-[#E8E4DC] pb-5">
              <div>
                <img
                  src="/brand/arklintech-invoice-header.png"
                  alt="ARKLINTECH"
                  className="h-10 w-auto object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/brand/Arklintech_Keystone_logo.svg'; }}
                />
                <div className="text-[9px] font-bold font-mono tracking-[0.16em] text-[#0B132B] mt-2">
                  IDEAS &nbsp;→&nbsp; SYSTEMS &nbsp;→&nbsp; REAL &nbsp;IMPACT
                </div>
              </div>

              <div className="flex items-center gap-3 text-right">
                <div className="w-[1.5px] h-10 bg-[#1463FF]" />
                <div className="text-[7.5px] font-bold text-[#0B132B] font-mono leading-tight uppercase tracking-wider">
                  INTELLIGENT<br />SYSTEMS<br />FOR A<br />BRIGHTER<br />TOMORROW
                </div>
              </div>
            </div>

            {/* Information Grid: BILL TO, PROJECT, INVOICE */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
              {/* BILL TO */}
              <div className="md:col-span-5 space-y-1">
                <span className="font-mono text-[9px] font-bold text-[#1463FF] uppercase tracking-wider block">BILL TO</span>
                <strong className="text-sm font-bold text-[#0B132B] block leading-snug">{clientName}</strong>
                <p className="text-[11px] text-[#0B132B] whitespace-pre-wrap leading-tight mt-1">{clientAddress}</p>
                {clientEmail && <p className="text-[10px] text-[#64748B] font-mono mt-1">Email: {clientEmail}</p>}
                {clientPhone && <p className="text-[10px] text-[#64748B] font-mono">Phone: {clientPhone}</p>}
              </div>

              {/* PROJECT */}
              <div className="md:col-span-4 space-y-1">
                <span className="font-mono text-[9px] font-bold text-[#1463FF] uppercase tracking-wider block">PROJECT</span>
                <strong className="text-xs font-bold text-[#0B132B] block leading-snug">{projectName}</strong>
                <div className="text-[10.5px] text-[#64748B] space-y-0.5 pt-1 font-mono">
                  <div>Project Ref.: <strong className="text-[#0B132B]">{selectedProjectId ? selectedProjectId.slice(0, 10).toUpperCase() : 'HE-2026-01'}</strong></div>
                  <div>Invoice Date: <strong className="text-[#0B132B]">{invoiceDate}</strong></div>
                  <div>Due Date: <strong className="text-[#0B132B]">{dueDate}</strong></div>
                  <div>Payment Terms: <strong className="text-[#0B132B]">{paymentTerms}</strong></div>
                  <div>Currency: <strong className="text-[#0B132B]">{currency}</strong></div>
                </div>
              </div>

              {/* INVOICE PANEL */}
              <div className="md:col-span-3 bg-white rounded-xl border border-[#E8E4DC] p-3 space-y-2">
                <span className="text-[9px] font-mono font-bold text-[#94A3B8] uppercase block">INVOICE</span>
                <div className="font-black text-sm font-mono text-[#0B132B]">INV-2026-001</div>
                <div>
                  <span className="text-[8px] font-mono font-bold text-[#94A3B8] block mb-0.5">STATUS</span>
                  <span className="px-2 py-0.5 rounded-full font-mono text-[9px] font-bold bg-[#DBEAFE] text-[#1D4ED8] inline-block">
                    DRAFT
                  </span>
                </div>
                <div className="text-[10px] text-[#64748B] font-mono pt-1">
                  {invoiceDate}
                </div>
              </div>
            </div>

            {/* Service Items Table */}
            <div className="rounded-xl overflow-hidden border border-[#E8E4DC] bg-white">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#0B132B] text-white">
                    <th className="px-3.5 py-2.5 font-mono text-[9px] font-bold uppercase w-10">#</th>
                    <th className="px-3.5 py-2.5 font-mono text-[9px] font-bold uppercase">DESCRIPTION</th>
                    <th className="px-3.5 py-2.5 font-mono text-[9px] font-bold uppercase text-center w-12">QTY</th>
                    <th className="px-3.5 py-2.5 font-mono text-[9px] font-bold uppercase text-right w-24">RATE (INR)</th>
                    <th className="px-3.5 py-2.5 font-mono text-[9px] font-bold uppercase text-right w-24">AMOUNT (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1EDE4]">
                  {activeLineItems.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-[#FDFBF7]">
                      <td className="px-3.5 py-3 font-mono font-bold text-xs text-[#0B132B]">{idx + 1}</td>
                      <td className="px-3.5 py-3 space-y-0.5">
                        <strong className="text-xs font-bold text-[#0B132B] block">{item.serviceName}</strong>
                        <p className="text-[10.5px] text-[#64748B] leading-tight">{item.description}</p>
                      </td>
                      <td className="px-3.5 py-3 text-center font-mono text-xs">{item.qty}</td>
                      <td className="px-3.5 py-3 text-right font-mono text-xs">₹{item.rate.toLocaleString('en-IN')}</td>
                      <td className="px-3.5 py-3 text-right font-mono font-bold text-xs">₹{item.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notes & Totals */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start text-xs">
              <div className="md:col-span-7 bg-white rounded-xl border border-[#E8E4DC] p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[#0B132B]">
                  <FileText className="w-3.5 h-3.5 text-[#1463FF]" />
                  <span>Notes</span>
                </div>
                <ul className="text-[10.5px] text-[#64748B] space-y-1 list-disc pl-4 leading-tight">
                  <li>This invoice covers the development and deployment of the agreed project scope as per our discussion.</li>
                  <li>Additional features outside the agreed scope will be billed separately upon approval.</li>
                  <li>Please make the payment within the due date to ensure continued support and development.</li>
                  <li>For any queries, feel free to contact us.</li>
                </ul>
              </div>

              <div className="md:col-span-5 bg-white rounded-xl border border-[#E8E4DC] p-4 space-y-2 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Subtotal</span>
                  <strong className="text-[#0B132B]">₹{subtotal.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Discount</span>
                  <strong className="text-[#0B132B]">₹{discount.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Tax ({taxPct}%)</span>
                  <strong className="text-[#0B132B]">₹{taxAmount.toLocaleString('en-IN')}</strong>
                </div>

                <div className="bg-[#EDF4FF] border border-[#1463FF]/30 rounded-xl p-3 flex items-center justify-between pt-2">
                  <span className="font-bold text-sm text-[#1463FF]">TOTAL</span>
                  <strong className="text-base text-[#0B132B]">₹{total.toLocaleString('en-IN')}</strong>
                </div>

                <div className="pt-1 text-[9.5px]">
                  <span className="text-[#94A3B8] block">Amount in Words:</span>
                  <span className="font-bold text-[#0B132B]">{words}</span>
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div className="flex items-end justify-between pt-4 border-t border-[#E8E4DC]">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-[#0B132B]">Thank you for your business.</p>
                <div className="h-12 flex items-center">
                  <img
                    src="/brand/anas-signature.png"
                    alt="Signature"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <p className="font-bold text-xs text-[#0B132B] leading-none">Anas Ahmed Khan</p>
                <p className="text-[10px] text-[#64748B]">Founder</p>
                <p className="text-[10px] font-bold text-[#0B132B]">ARKLINTECH TECHNOLOGY SYSTEMS</p>
              </div>

              <div className="flex items-center gap-3 text-right">
                <div className="w-[1.5px] h-12 bg-[#1463FF]" />
                <div className="text-[8px] font-bold font-mono text-[#0B132B] uppercase leading-tight tracking-wider">
                  BUILD<br />AUTOMATE<br />INTEGRATE<br />SCALE
                </div>
              </div>
            </div>

            {/* Bottom Footer Navy Bar */}
            <div className="bg-[#0B132B] text-white -mx-7 -mb-7 p-4 rounded-b-2xl flex items-center justify-between text-[10px] font-mono">
              <div>
                <span>www.arklintech.com</span> &nbsp;•&nbsp; <span>work@arklintech.com</span>
              </div>
              <div className="font-bold tracking-wider">
                BUILT FOR WHAT&apos;S NEXT.
              </div>
              <div className="text-right text-[8.5px] text-[#94A3B8] leading-tight">
                AI | SOFTWARE | AUTOMATION<br />
                BUSINESS SYSTEMS | DIGITAL INFRASTRUCTURE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Service Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#D8D4C9] p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-[#0B132B]">Add Custom Service</h3>
            <form onSubmit={handleAddCustom} className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  value={newCustom.name}
                  onChange={(e) => setNewCustom({ ...newCustom, name: e.target.value })}
                  placeholder="e.g. Custom AI Voice Assistant"
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newCustom.description}
                  onChange={(e) => setNewCustom({ ...newCustom, description: e.target.value })}
                  placeholder="Brief service deliverable description..."
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Manual Amount (INR)</label>
                <input
                  type="number"
                  min="0"
                  value={newCustom.amount}
                  onChange={(e) => setNewCustom({ ...newCustom, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs font-mono font-bold"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowCustomModal(false)} className="px-3 py-1.5 text-xs">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-[#1463FF] text-white text-xs font-mono font-bold rounded-lg">Add to Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
