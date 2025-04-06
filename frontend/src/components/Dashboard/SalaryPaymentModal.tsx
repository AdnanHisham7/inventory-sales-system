// SalaryPaymentModal.tsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Modal from "../POSInterface/Modal";
import { baseUrl } from "../../../utils/services";

interface SalaryPaymentProps {
  staff: {
    id: number;
    username: string;
    salary: number;
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SalaryPaymentModal: React.FC<SalaryPaymentProps> = ({
  staff,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [paymentDate, setPaymentDate] = useState(getCurrentPaymentDate());
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  function getCurrentPaymentDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options); // e.g., April 6, 2025
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseUrl}/api/users/salaryCredit`,
        {
          userId: staff?.id,
          amount: staff?.salary,
          paymentDate,
          status: "paid",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success(`Salary paid to ${staff?.username} on ${paymentDate}`);
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Error processing salary payment:", error);
      toast.error("Failed to process salary payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-5">Process Salary Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Staff Name</label>
            <input
              type="text"
              value={staff?.username}
              disabled
              className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Payment Date</label>
            <input
              type="text"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 bg-white text-black"
              required
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount (₹)</label>
            <input
              type="number"
              value={staff?.salary}
              disabled
              className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-black"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Process Payment"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SalaryPaymentModal;
