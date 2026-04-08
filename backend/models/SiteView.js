import mongoose from 'mongoose';

const siteViewSchema = new mongoose.Schema({
  view_date: {
    type: String,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

const SiteView = mongoose.model('SiteView', siteViewSchema);

export default SiteView;
