const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            max: 160,
            required: true
        },
        slug: {
            type: String
        },
        body: {
            type: Array,
            required: true,
            min: 200,
            max: 2000000
        },
        html: {
            type: String
        },
        excerpt: {
            type: String,
            max: 1000
        },
        mtitle: {
            type: String
        },
        mdesc: {
            type: String
        },
        cover_photo: {
            type: String
        },
        hidden: { 
            type: Boolean, 
            default: true 
        },
        comments: [{ 
            type: ObjectId, 
            ref: 'Comment'
        }],
        selectedProducts: {
            type: [Array]
        },
        categories: [{ 
            type: ObjectId, 
            ref: 'Category'
        }],
        tags: [{ 
            type: ObjectId, 
            ref: 'Tag'
        }],
        postedBy: {
            type: ObjectId,
            ref: 'User'
        },
        shopPostedAt: { 
            type: ObjectId, 
            ref: 'Shop'
        },
        shopifyDomain: { 
            type: String
        },
        userNotified: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

blogSchema.index({ slug: 1, shopifyDomain: 1}, { unique: true });

blogSchema.methods = {
    setDefaultUpgrades: function() {
        var self = this;
        WarehouseUpgrade.find({ level: 0 }).exec(function (err, collection) {
            for (var i = 0; i < collection.length; i++) {
                var upgrade = collection[i];
                self[upgrade.type] = upgrade._id;
            }
            self.save();
        });
    }
};

module.exports = mongoose.model('Blog', blogSchema);
