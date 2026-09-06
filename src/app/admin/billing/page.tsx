'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Receipt, Plus, Search, Download, ExternalLink, Filter,
  FileText, CheckCircle2, Clock, AlertCircle, DollarSign
} from 'lucide-react';
import { fetchAdmin } from '@/lib/admin-client';
import type { InvoiceRecord } from '@/lib/admin-db';

export default function BillingDirectoryPage() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const loadInvoices = async () => {
    try {
      setLoading(true);
      const res = await fetchAdmin('/api/admin/invoices');
      const data = await res.json();
      setInvoices(data.data || []);
    } catch (err) {
      console.error('Failed to load invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const totalInvoiced = invoices.reduce((sum, i) => sum + (i.total || 0), 0);
  const totalPaid = invoices.filter((i) => i.status === 'PAID').reduce((sum, i) => sum + (i.total || 0), 0);
  const totalOutstanding = totalInvoiced - totalPaid;

  const filtered = invoices.filter((inv) => {
    const matchSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 max-w-[1280px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-1">
            <span>COMMAND</span>
            <span>/</span>
            <span className="text-[#1463FF] font-bold">BILLING</span>
          </div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
            Invoices & Billing
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">Manage commercial invoicing, itemized service billings, and generated PDF documents.</p>
        </div>

        <Link
          href="/admin/billing/create"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1463FF] hover:bg-[#004AD6] text-white text-xs font-mono font-bold transition-all shadow-md shadow-[#1463FF]/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> CREATE INVOICE
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#E8E4DC] p-5">
          <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Total Invoiced</span>
          <div className="font-black text-2xl text-[#0B132B] mt-1 font-mono">₹{totalInvoiced.toLocaleString('en-IN')}</div>
          <span className="text-[11px] font-medium text-[#64748B]">Across {invoices.length} billing records</span>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E4DC] p-5">
          <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Total Collected</span>
          <div className="font-black text-2xl text-emerald-600 mt-1 font-mono">₹{totalPaid.toLocaleString('en-IN')}</div>
          <span className="text-[11px] font-bold text-emerald-600">Paid invoices</span>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E4DC] p-5">
          <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Outstanding Amount</span>
          <div className="font-black text-2xl text-amber-600 mt-1 font-mono">₹{totalOutstanding.toLocaleString('en-IN')}</div>
          <span className="text-[11px] font-medium text-[#64748B]">Sent & pending settlement</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-[#E8E4DC] p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by invoice number or client..."
            className="w-full bg-[#FDFBF7] border border-[#E8E4DC] rounded-lg pl-9 pr-3 py-2 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
          />
        </div>
        <div className="flex items-center gap-2">
          {['ALL', 'SENT', 'PAID', 'DRAFT'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                statusFilter === st
                  ? 'bg-[#1463FF] text-white'
                  : 'bg-[#FDFBF7] text-[#64748B] hover:text-[#0B132B] border border-[#E8E4DC]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#F1EDE4] bg-[#FDFBF7]">
              <th className="px-4 py-3.5 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Invoice #</th>
              <th className="px-4 py-3.5 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Client</th>
              <th className="px-4 py-3.5 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Invoice Date</th>
              <th className="px-4 py-3.5 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Due Date</th>
              <th className="px-4 py-3.5 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Status</th>
              <th className="px-4 py-3.5 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Total (INR)</th>
              <th className="px-4 py-3.5 font-mono text-[9px] font-bold text-[#94A3B8] uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F8F5F0]">
            {loading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-[#94A3B8]">
                  Loading invoices...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-12 text-center text-[#94A3B8] space-y-2">
                  <Receipt className="w-8 h-8 mx-auto text-[#94A3B8]" />
                  <p className="font-bold text-xs text-[#0B132B]">No invoices found</p>
                  <Link
                    href="/admin/billing/create"
                    className="inline-block mt-2 px-3.5 py-1.5 bg-[#1463FF] text-white text-xs font-mono font-bold rounded-lg"
                  >
                    Create New Invoice
                  </Link>
                </td>
              </tr>
            ) : (
              filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#FDFBF7] transition-colors">
                  <td className="px-4 py-3.5 font-mono font-bold text-[#1463FF]">{inv.invoiceNumber}</td>
                  <td className="px-4 py-3.5 font-bold text-[#0B132B]">{inv.clientName}</td>
                  <td className="px-4 py-3.5 font-mono text-[#64748B]">{inv.invoiceDate}</td>
                  <td className="px-4 py-3.5 font-mono text-[#64748B]">{inv.dueDate}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                      inv.status === 'PAID'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : inv.status === 'SENT'
                        ? 'bg-[#DBEAFE] text-[#1D4ED8] border border-blue-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-[#0B132B]">₹{inv.total.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3.5 text-right space-x-3">
                    <a
                      href={`/api/admin/invoices/${inv.id}/pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono font-bold text-xs text-[#1463FF] hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </a>
                    {inv.pdfDriveUrl && (
                      <a
                        href={inv.pdfDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-[#64748B] hover:text-[#0B132B]"
                      >
                        Drive <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
