const Shop = require('../models/shop');
let message = '';
let shopDomain = '';

const saveNewShop = async (ctx, accessToken, shopify_domain) => {

    console.log('shopify_domain in saveNewShop func', shopify_domain);

     await Shop.findOne({ shopify_domain }).exec((err, shop) => {
          if (err){
              message = 'ran error logic';
              console.log('ran error logic. err:', err);          
          } else if (!shop){
              message = 'ran no shop found logic';
              console.log('message: ', message);
              
              shopifyScope = 'read_products, write_products, read_content, write_content'; 
              let new_shop = new Shop({ shopify_domain, accessToken, shopifyScope})
              new_shop.save((err, shopReturned) => {
                if (err) {
                  console.log('err trying to save shop: ', err)
                } else {
                  console.log('shop successfully created: ',shopReturned);
                  shopDomain = shop.shopify_domain;
                }});
          } else {
              message = 'shop found';
              console.log('shop found: ', shop) 
              shopDomain = shop.shopify_domain;  
          }
      });
    console.log('message', message)
    if(message=='shop found'){
      return ctx.redirect(`https://${shopDomain}/admin/apps/community-2/manage/manage-posts`)
    } else{
       return message;      
    }
};

module.exports = saveNewShop;