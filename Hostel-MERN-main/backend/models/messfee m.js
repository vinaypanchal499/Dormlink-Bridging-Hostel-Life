// Hostel Mess Fee model — plain JavaScript (ES6+)
// Purpose: store monthly mess-fee records and provide add/query/update utilities.
// Usage: instantiate MessFeeModel, then use addMonthlyFee, markPaid, getStudentFees, etc.

class MessFeeModel {
  constructor() {
    // In-memory storage; replace with DB calls if needed.
    // Each record: { id, studentId, month: "YYYY-MM", amount: Number, status: 'pending'|'paid', createdAt, paidAt }
    this.records = [];
    this._nextId = 1;
  }

  // Helper: normalize month input to "YYYY-MM" string
  static normalizeMonth(input) {
    if (!input) {
      const d = new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      return `${y}-${m}`;
    }
    // If already "YYYY-MM", return as is
    if (/^\d{4}-\d{2}$/.test(input)) return input;
    // Try parsing JS Date or "MM/YYYY" or "MM-YYYY"
    const parsed = new Date(input);
    if (!isNaN(parsed)) {
      const y = parsed.getFullYear();
      const m = String(parsed.getMonth() + 1).padStart(2, '0');
      return `${y}-${m}`;
    }
    // Try MM/YYYY or MM-YYYY
    const m1 = input.match(/^(\d{1,2})[\/\-](\d{4})$/);
    if (m1) {
      const month = String(Number(m1[1])).padStart(2, '0');
      return `${m1[2]}-${month}`;
    }
    throw new Error('Invalid month format. Use "YYYY-MM", Date object, or "MM/YYYY".');
  }

  // Add a monthly fee record for a student
  addMonthlyFee({ studentId, amount, month, status = 'pending' } = {}) {
    if (!studentId) throw new Error('studentId is required');
    if (amount == null || Number.isNaN(Number(amount))) throw new Error('valid amount is required');
    const normalizedMonth = MessFeeModel.normalizeMonth(month);
    const numericAmount = Number(amount);

    // Prevent duplicate for same student & month (optional policy)
    const exists = this.records.find(r => r.studentId === studentId && r.month === normalizedMonth);
    if (exists) {
      throw new Error(`Fee already exists for student ${studentId} for month ${normalizedMonth}`);
    }

    const rec = {
      id: this._nextId++,
      studentId,
      month: normalizedMonth,
      amount: numericAmount,
      status: status === 'paid' ? 'paid' : 'pending',
      createdAt: new Date().toISOString(),
      paidAt: status === 'paid' ? new Date().toISOString() : null
    };
    this.records.push(rec);
    return rec;
  }

  // Bulk add monthly fee for all students (studentIds: array)
  addMonthlyFeeForMany({ studentIds = [], amount, month } = {}) {
    if (!Array.isArray(studentIds) || studentIds.length === 0) throw new Error('studentIds array required');
    return studentIds.map(sid => {
      try {
        return this.addMonthlyFee({ studentId: sid, amount, month });
      } catch (e) {
        // On duplicate or error, return an object describing failure for that student
        return { studentId: sid, error: e.message };
      }
    });
  }

  // Mark a fee record as paid (by id or by studentId+month)
  markPaid({ id = null, studentId = null, month = null, paidAt = null } = {}) {
    let rec = null;
    if (id != null) rec = this.records.find(r => r.id === id);
    else if (studentId && month) {
      const normalizedMonth = MessFeeModel.normalizeMonth(month);
      rec = this.records.find(r => r.studentId === studentId && r.month === normalizedMonth);
    } else {
      throw new Error('Provide id or (studentId and month)');
    }
    if (!rec) throw new Error('Record not found');
    rec.status = 'paid';
    rec.paidAt = (paidAt && new Date(paidAt).toISOString()) || new Date().toISOString();
    return rec;
  }

  // Update amount for a record (id)
  updateAmount(id, newAmount) {
    const rec = this.records.find(r => r.id === id);
    if (!rec) throw new Error('Record not found');
    if (newAmount == null || Number.isNaN(Number(newAmount))) throw new Error('valid newAmount required');
    rec.amount = Number(newAmount);
    return rec;
  }

  // Delete a record by id
  deleteRecord(id) {
    const idx = this.records.findIndex(r => r.id === id);
    if (idx === -1) throw new Error('Record not found');
    const [removed] = this.records.splice(idx, 1);
    return removed;
  }

  // Query: get all fees for a student (optionally filter by year or month)
  getStudentFees(studentId, { year = null, month = null } = {}) {
    if (!studentId) throw new Error('studentId required');
    let res = this.records.filter(r => r.studentId === studentId);
    if (year) res = res.filter(r => r.month.startsWith(String(year)));
    if (month) {
      const normalizedMonth = MessFeeModel.normalizeMonth(month);
      res = res.filter(r => r.month === normalizedMonth);
    }
    return res.slice(); // return copy
  }

  // Get outstanding amount for a student (sum of pending)
  getOutstanding(studentId) {
    const fees = this.getStudentFees(studentId);
    return fees.reduce((sum, r) => sum + (r.status === 'pending' ? Number(r.amount) : 0), 0);
  }

  // List all records (with optional filters)
  listAll({ status = null, month = null } = {}) {
    let res = this.records;
    if (status) res = res.filter(r => r.status === status);
    if (month) {
      const normalizedMonth = MessFeeModel.normalizeMonth(month);
      res = res.filter(r => r.month === normalizedMonth);
    }
    return res.slice();
  }

  // Simple persistence helpers (localStorage) — optional; call only in browser
  saveToLocalStorage(key = 'mess_fee_records') {
    if (typeof window === 'undefined' || !window.localStorage) throw new Error('localStorage not available');
    window.localStorage.setItem(key, JSON.stringify({ records: this.records, nextId: this._nextId }));
    return true;
  }

  loadFromLocalStorage(key = 'mess_fee_records') {
    if (typeof window === 'undefined' || !window.localStorage) throw new Error('localStorage not available');
    const raw = window.localStorage.getItem(key);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    this.records = parsed.records || [];
    this._nextId = parsed.nextId || (this.records.length ? Math.max(...this.records.map(r => r.id)) + 1 : 1);
    return true;
  }
}

/* ----------------------
   Example usage (uncomment to run)
   ----------------------

// create model
const model = new MessFeeModel();

// add single monthly fee
model.addMonthlyFee({ studentId: 'S101', amount: 6000, month: '2025-11' });

// add many students
model.addMonthlyFeeForMany({ studentIds: ['S102', 'S103'], amount: 8500, month: '2025-11' });

// mark paid for a student+month
model.markPaid({ studentId: 'S101', month: '2025-11' });

// get outstanding
console.log('Outstanding S102:', model.getOutstanding('S102'));

// persist in browser localStorage (optional)
model.saveToLocalStorage();

*/

