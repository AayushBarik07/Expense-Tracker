const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async(req, res) => {
  try {
    const userId = req.user.id;
    if (!Types.ObjectId.isValid(String(userId))) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const userObjectId = new Types.ObjectId(String(userId));

    // Fetch total income and expenses for the user
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpenses = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Get Income transaction in the last 60 days
    const last60DaysIncome = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get Expense transaction in the last 60 days
    const last60DaysExpenses = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total income and expenses for the current month
    const incomeLast60Days = await last60DaysIncome.reduce(
      (sum, transaction) => sum + transaction.amount, 0
    );

    const expensesLast60Days = await last60DaysExpenses.reduce(
      (sum, transaction) => sum + transaction.amount, 0
    );


    // Fetch last 5 transactions (both income and expenses) for the user
    const lastTransactions = [
      ...(await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(), 
          type: "income", 
        })
      ),

      ...(await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(), 
          type: "expense",
        })
      ),
    ].sort((a,b) => b.date - a.date); // Sort latest first

    // First Response
    res.json({
      totalBalance: 
        (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpenses[0]?.total || 0,
      expensesLast60Days: {
        total: expensesLast60Days,
        transactions: last60DaysExpenses,
      },

      incomeLast60Days: {
        total: incomeLast60Days,
        transactions: last60DaysIncome,
      },
      recentTransactions: lastTransactions,
    });
  } 
  catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}