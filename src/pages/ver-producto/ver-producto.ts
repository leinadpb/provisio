import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'ver-producto.html',
})
export class VerProductoPage {

  private items: Array<any> = [
    {
      url: "https://cdn.shopify.com/s/files/1/2362/7179/products/Nestle_Cocoa_Instant_Powder_180_grams_2048x.jpg",
      title: "Cocoa nestle",
      description: "Un producto para pasarla en familia."
    },
    {
      url: "https://cdn.shopify.com/s/files/1/2362/7179/products/Nestle_Cocoa_Instant_Powder_180_grams_2048x.jpg",
      title: "Cocoa nestle",
      description: "Un producto para pasarla en familia."
    },
    {
      url: "https://cdn.shopify.com/s/files/1/2362/7179/products/Nestle_Cocoa_Instant_Powder_180_grams_2048x.jpg",
      title: "Cocoa nestle",
      description: "Un producto para pasarla en familia."
    },
    {
      url: "https://cdn.shopify.com/s/files/1/2362/7179/products/Nestle_Cocoa_Instant_Powder_180_grams_2048x.jpg",
      title: "Cocoa nestle",
      description: "Un producto para pasarla en familia."
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) { }
  
}
