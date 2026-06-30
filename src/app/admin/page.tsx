"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Download,
  RefreshCw,
} from "lucide-react";

interface Donation {
  id: string;
  amount: number;
  currency: string;
  name: string;
  message?: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/donations?campaignId=hawassa-main-fund");
      const data = await response.json();
      setDonations(data.donations || []);
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalRaised: donations.reduce((sum, d) => sum + d.amount, 0),
    donorCount: donations.length,
    successfulDonations: donations.filter((d) => d.status === "successful")
      .length,
    pendingDonations: donations.filter((d) => d.status === "pending").length,
  };

  const filteredDonations = donations.filter((d) => {
    if (filter === "all") return true;
    return d.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Hawassa Community Fund</p>
          </div>
          <button
            onClick={fetchDonations}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Total Raised</h3>
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              ETB {stats.totalRaised.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">of ETB 5,000,000 goal</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Total Donors</h3>
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {stats.donorCount}
            </p>
            <p className="text-sm text-gray-500 mt-2">Registered donors</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Successful</h3>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {stats.successfulDonations}
            </p>
            <p className="text-sm text-gray-500 mt-2">Verified donations</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-yellow-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Pending</h3>
              <BarChart3 className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {stats.pendingDonations}
            </p>
            <p className="text-sm text-gray-500 mt-2">Awaiting verification</p>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Recent Donations</h2>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="successful">Successful</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">Loading donations...</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">No donations found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Donor Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Message
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonations.map((donation) => (
                    <tr
                      key={donation.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {donation.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-600 font-semibold">
                        ETB {donation.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            donation.status === "successful"
                              ? "bg-green-100 text-green-800"
                              : donation.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {donation.status.charAt(0).toUpperCase() +
                            donation.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {donation.message || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <p>
            <strong>Note:</strong> This is a demo admin dashboard. In production,
            add authentication and connect to a real database.
          </p>
        </div>
      </div>
    </div>
  );
}
