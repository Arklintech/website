'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Receipt, Plus, Search, Download, ExternalLink, Filter,
  FileText, CheckCircle2, Clock, AlertCircle, DollarSign, FileEdit,
  Trash2, AlertTriangle
} from 'lucide-react';
import { fetchAdmin, fetchAdminJSON, invalidateAdminCache } from '@/lib/admin-client';
import type { InvoiceRecord } from '@/lib/admin-db';

export default function BillingDirectoryPage() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [invoiceToDelete, setInvoiceToDelete] = useState<InvoiceRecord | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [actionNotification, setActionNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const loadInvoices = async () => {
    try {
      const { data, fromCache } = await fetchAdminJSON<{ data: InvoiceRecord[] }>(
        '/api/admin/invoices',
        (fresh) => {
          if (fresh?.data) setInvoices(fresh.data);
        }
      );
      if (data?.data) {
        setInvoices(data.data);
      }
      if (!fromCache) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error('Failed to load invoices:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const handleDeleteInvoice = async () => {
    if (!invoiceToDelete) return;
    try {
      setDeleting(true);
      const res = await fetchAdmin(`/api/admin/invoices/${encodeURIComponent(invoiceToDelete.id)}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete invoice');
      }

      invalidateAdminCache('/api/admin/invoices');
      setInvoices((prev) => prev.filter((inv) => inv.id !== invoiceToDelete.id));

      setActionNotification({
        text: `Invoice ${invoiceToDelete.invoiceNumber} deleted successfully from Sheets and records.`,
        type: 'success',
      });
      setTimeout(() => setActionNotification(null), 5000);
      setInvoiceToDelete(null);
    } catch (err: any) {
      console.error('Error deleting invoice:', err);
      setActionNotification({
        text: 'Failed to delete invoice. Please try again.',
        type: 'error',
      });
      setTimeout(() => setActionNotification(null), 5000);
    } finally {
      setDeleting(false);
    }
  };

  const totalInvoiced = invoices.reduce((sum, i) => sum + (i.total || 0), 0);
  const totalPaid = invoices.filter((i) => i.status === 'PAID').reduce((sum, i) => sum + (i.total || 0), 0);
  const totalOutstanding = totalInvoiced - totalPaid;

  const filtered = invoices.filter((inv) => {
    const matchSearch =
      (inv.invoiceNumber || '').toLowerCase().includes(search.toLowerCase()) ||
      (inv.clientName || '').toLowerCase().includes(search.toLowerCase());
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

      {actionNotification && (
        <div className={`p-4 rounded-xl text-xs font-mono font-bold flex items-center gap-2 animate-fadeIn ${
          actionNotification.type === 'success'
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionNotification.text}</span>
        </div>
      )}

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
            {loading && invoices.length === 0 ? (
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
                  <td className="px-4 py-3.5">
                    <Link
                      href={`/admin/billing/create?edit=${inv.id}`}
                      className="inline-flex items-center gap-1.5 font-mono font-bold text-[#1463FF] hover:text-[#004AD6] hover:underline group"
                      title="Click to open editable invoice"
                    >
                      <span>{inv.invoiceNumber}</span>
                      <FileEdit className="w-3 h-3 text-[#1463FF] opacity-70 group-hover:opacity-100" />
                    </Link>
                  </td>
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
                  <td className="px-4 py-3.5 text-right space-x-2">
                    <Link
                      href={`/admin/billing/create?edit=${inv.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#D8D4C9] bg-white hover:bg-[#FDFBF7] text-[#0B132B] font-mono font-bold text-[11px] transition-all"
                      title="Edit this invoice"
                    >
                      <FileEdit className="w-3 h-3 text-[#1463FF]" /> Edit
                    </Link>
                    <a
                      href={`/api/admin/invoices/${inv.id}/pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-transparent font-mono font-bold text-[11px] text-[#1463FF] hover:bg-[#EDF4FF]"
                    >
                      <Download className="w-3 h-3" /> PDF
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
                    <button
                      type="button"
                      onClick={() => setInvoiceToDelete(inv)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-transparent font-mono font-bold text-[11px] text-red-600 hover:bg-red-50 hover:border-red-200 transition-all"
                      title="Delete this invoice"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {invoiceToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#D8D4C9] p-6 w-full max-w-md shadow-2xl space-y-5 animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#0B132B]">DELETE INVOICE?</h3>
                <p className="text-xs text-[#64748B]">
                  Are you sure you want to delete this invoice? This will remove the invoice record, associated items, and Drive PDF.
                </p>
              </div>
            </div>

            <div className="bg-[#FDFBF7] border border-[#E8E4DC] rounded-xl p-4 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Invoice:</span>
                <strong className="text-[#0B132B] font-bold">{invoiceToDelete.invoiceNumber}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Client:</span>
                <span className="text-[#0B132B] font-bold text-right truncate max-w-[220px]">{invoiceToDelete.clientName}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#F1EDE4] pt-2">
                <span className="text-[#64748B]">Amount:</span>
                <strong className="text-[#0B132B] font-black text-sm">₹{invoiceToDelete.total.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <p className="text-[11px] font-bold text-red-600 font-mono">
              This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#F1EDE4]">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setInvoiceToDelete(null)}
                className="px-4 py-2 rounded-xl border border-[#D8D4C9] text-xs font-mono font-bold text-[#64748B] hover:text-[#0B132B] hover:bg-[#FDFBF7] transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDeleteInvoice}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold transition-all shadow-md shadow-red-600/20 flex items-center gap-1.5 disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {deleting ? 'Deleting Invoice...' : 'Delete Invoice'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
