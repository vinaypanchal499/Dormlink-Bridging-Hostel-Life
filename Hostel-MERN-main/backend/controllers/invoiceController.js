// const { validationResult } = require('express-validator');
// const { Invoice, MessOff, Student } = require('../models');
// const { Mess_bill_per_day } = require('../constants/mess');

// // @route   Generate api/invoice/generate
// // @desc    Generate invoice
// // @access  Public
// exports.generateInvoices = async (req, res) => {
//     let success = false;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array(), success });
//     }
//     const { hostel } = req.body;
//     const students = await Student.find({ hostel })
//     const invoices = await Invoice.find({ student: { $in: students }, date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } })
//     if (invoices.length === students.length) {
//         return res.status(400).json({ errors: 'Invoices already generated', success });
//     }

//     // get days in previous month
//     let daysinlastmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();

//     let amount = Mess_bill_per_day * daysinlastmonth;
//     count = 0;
//     students.map(async (student) => {
//         let messoff = await MessOff.find({ student: student });
//         if (messoff) {
//             messoff.map((messoffone) => {
//                 if (messoffone.status === 'approved' && messoffone.return_date.getMonth() + 1 === new Date().getMonth()) {
//                     let leaving_date = messoffone.leaving_date;
//                     let return_date = messoffone.return_date;
//                     let number_of_days = (return_date - leaving_date) / (1000 * 60 * 60 * 24);
//                     amount -= Mess_bill_per_day * number_of_days;
//                 }
//             });
//         }

//         try {
//             let invoice = new Invoice({
//                 student,
//                 amount
//             });
//             await invoice.save();
//             count++;
//         }
//         catch (err) {
//             console.error(err.message);
//             res.status(500).send('Server error');
//         }
//     });
//     success = true;
//     res.status(200).json({ success, count });
// }

// // @route   GET api/invoice/getbyid
// // @desc    Get all invoices
// // @access  Public
// exports.getInvoicesbyid = async (req, res) => {
//     let success = false;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array(), success });
//     }
//     const { hostel } = req.body;
//     let student = await Student.find({ hostel: hostel });
//     try {
//         let invoices = await Invoice.find({ student: student }).populate('student', ['name', 'room_no', 'cms_id']);
//         success = true;
//         res.status(200).json({ success, invoices });
//     }
//     catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// }

// // @route   GET api/invoice/student
// // @desc    Get all invoices
// // @access  Public
// exports.getInvoices = async (req, res) => {
//     let success = false;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array(), success });
//     }
//     const { student } = req.body;
//     try {
//         let invoices = await Invoice.find({ student: student });
//         success = true;
//         res.status(200).json({ success, invoices });
//     }
//     catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// }

// // @route   GET api/invoice/update
// // @desc    Update invoice
// // @access  Public
// exports.updateInvoice = async (req, res) => {
//     let success = false;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array(), success });
//     }
//     const { student, status } = req.body;
//     try {
//         let invoice = await Invoice.findOneAndUpdate({ student: student, date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } }, { status: status });
//         success = true;
//         res.status(200).json({ success, invoice });
//     }
//     catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// }


const { validationResult } = require('express-validator');
const { Invoice, MessOff, Student } = require('../models');
const { Mess_bill_per_day } = require('../constants/mess');

// @route   Generate api/invoice/generate
// @desc    Generate invoice
// @access  Public
exports.generateInvoices = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { hostel } = req.body;
    
    try {
        const students = await Student.find({ hostel });
        
        // Get first day of current month for filtering
        const firstDayOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        
        const invoices = await Invoice.find({ 
            student: { $in: students }, 
            date: { $gte: firstDayOfCurrentMonth } 
        });
        
        if (invoices.length === students.length) {
            return res.status(400).json({ errors: 'Invoices already generated', success });
        }

        // Get days in previous month
        const currentDate = new Date();
        const previousMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
        const previousMonthYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
        const daysInPreviousMonth = new Date(previousMonthYear, previousMonth + 1, 0).getDate();

        let count = 0;
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const invoiceTitle = `Mess Bill - ${monthNames[previousMonth]} ${previousMonthYear}`;

        // Process students sequentially to avoid race conditions
        for (const student of students) {
            let amount = Mess_bill_per_day * daysInPreviousMonth;
            
            // Check if invoice already exists for this student
            const existingInvoice = await Invoice.findOne({ 
                student: student._id, 
                date: { $gte: firstDayOfCurrentMonth } 
            });
            
            if (existingInvoice) {
                console.log(`Invoice already exists for student ${student.name}`);
                continue;
            }

            // Calculate mess off deductions
            const messoffRecords = await MessOff.find({ 
                student: student._id,
                status: 'approved'
            });
            
            if (messoffRecords && messoffRecords.length > 0) {
                for (const messoff of messoffRecords) {
                    const leavingDate = new Date(messoff.leaving_date);
                    const returnDate = new Date(messoff.return_date);
                    
                    // Check if mess off period overlaps with previous month
                    if (leavingDate.getMonth() === previousMonth && leavingDate.getFullYear() === previousMonthYear) {
                        const monthStart = new Date(previousMonthYear, previousMonth, 1);
                        const monthEnd = new Date(previousMonthYear, previousMonth + 1, 0);
                        
                        // Calculate actual days off within the month
                        const effectiveLeaving = leavingDate > monthStart ? leavingDate : monthStart;
                        const effectiveReturn = returnDate < monthEnd ? returnDate : monthEnd;
                        
                        if (effectiveLeaving <= effectiveReturn) {
                            const numberOfDays = Math.ceil((effectiveReturn - effectiveLeaving) / (1000 * 60 * 60 * 24)) + 1;
                            amount -= Mess_bill_per_day * numberOfDays;
                        }
                    }
                }
            }

            // Ensure amount is not negative
            amount = Math.max(0, amount);

            try {
                let invoice = new Invoice({
                    student: student._id,
                    amount: amount,
                    title: invoiceTitle,
                    date: firstDayOfCurrentMonth // Set to current month for the invoice date
                });
                await invoice.save();
                count++;
            } catch (err) {
                console.error(`Error creating invoice for student ${student.name}:`, err.message);
            }
        }
        
        success = true;
        res.status(200).json({ success, count });
    } catch (err) {
        console.error('Server error in generateInvoices:', err.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
}

// @route   GET api/invoice/getbyid
// @desc    Get all invoices
// @access  Public
exports.getInvoicesbyid = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { hostel } = req.body;
    
    try {
        let students = await Student.find({ hostel: hostel });
        let invoices = await Invoice.find({ student: { $in: students } })
            .populate('student', ['name', 'room_no', 'cms_id'])
            .sort({ date: -1 });
        success = true;
        res.status(200).json({ success, invoices });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
}

// @route   GET api/invoice/student
// @desc    Get all invoices for a student
// @access  Public
exports.getInvoices = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { student } = req.body;
    
    try {
        let invoices = await Invoice.find({ student: student })
            .sort({ date: -1 }); // Sort by date descending
        success = true;
        res.status(200).json({ success, invoices });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
}

// @route   GET api/invoice/update
// @desc    Update invoice
// @access  Public
exports.updateInvoice = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { student, status } = req.body;
    
    try {
        const firstDayOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        let invoice = await Invoice.findOneAndUpdate(
            { 
                student: student, 
                date: { $gte: firstDayOfCurrentMonth } 
            }, 
            { status: status },
            { new: true } // Return updated document
        );
        
        if (!invoice) {
            return res.status(404).json({ success: false, error: 'Invoice not found' });
        }
        
        success = true;
        res.status(200).json({ success, invoice });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
}