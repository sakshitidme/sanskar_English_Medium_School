import SiteView from '../models/SiteView.js';

// @desc    Increment site view count
// @route   POST /api/views
// @access  Public
export const incrementViewCount = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const siteView = await SiteView.findOneAndUpdate(
      { view_date: today },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    res.json(siteView);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get total site views
// @route   GET /api/views
// @access  Public
export const getTotalViews = async (req, res) => {
  try {
    const views = await SiteView.find();
    const total = views.reduce((acc, curr) => acc + curr.count, 0);
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
