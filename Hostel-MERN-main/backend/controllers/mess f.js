// messFeeController.js
// Hostel Mess Fee Controller — Monthly Add (JavaScript only)

// Import your model (if in Node.js, use require)
// const MessFeeModel = require('../models/messFeeModel');

const messFeeModel = new MessFeeModel(); // create instance

/**
 * @desc Add monthly fee for one student
 * @route POST /api/messfee/add
 * @body { studentId, amount, month }
 */
function addMonthlyFee(req, res) {
  try {
    const { studentId, amount, month } = req.body;

    if (!studentId || !amount) {
      return res.status(400).json({ error: "studentId and amount are required" });
    }

    const record = messFeeModel.addMonthlyFee({
      studentId,
      amount,
      month
    });

    return res.status(201).json({
      message: "Monthly mess fee added successfully",
      data: record
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

/**
 * @desc Add monthly fee for multiple students at once
 * @route POST /api/messfee/addMany
 * @body { studentIds: [], amount, month }
 */
function addMonthlyFeeForMany(req, res) {
  try {
    const { studentIds, amount, month } = req.body;

    if (!Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({ error: "studentIds array is required" });
    }
    if (!amount) {
      return res.status(400).json({ error: "amount is required" });
    }

    const result = messFeeModel.addMonthlyFeeForMany({
      studentIds,
      amount,
      month
    });

    return res.status(201).json({
      message: "Monthly mess fee added for all students",
      data: result
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Export controllers
// module.exports = { addMonthlyFee, addMonthlyFeeForMany };
