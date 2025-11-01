import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { ProductService } from '../../Services/Product/product.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { PhotoService } from '../../Services/photo.service';
import { DiscountService } from '../../Services/discount.service';

@Component({
  selector: 'app-all-products',
  imports: [NavbarComponent, FormsModule, NgStyle,CommonModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {
  cost_price : any;
  sale_price : any;
  name : any;
  description : any;
  discount : any;
  product: any;
  currency: any;
  color: any;
  size: any;
  stock: any;
  Weight: any;
  dimensions: any;
  material: any;
  width: any;
  height: any;
  hauteur: any
  author: any;
  flavor: any;
  gender: any;
  level: any;
  qte = 0;
  type: any;
  quality: any;
  brand: any;
  percent = 0.0;
  photo?: File[];
  invalid = "";
  uploadMessage :any;
  errorMessage: any;
  successMessage: any;
  status = '';
  isDropdownOpen = false;
  isDropdownCurrencyOpen = false;
  isDropdownStatusOpen = false;
  isDropdownCategoryOpen = false;
  isDropdownLevelOpen = false;
  isDropdownProductOpen = false;
  isRotatedCurrency = false;
  isRotatedCategory = false;
  isRotatedStatus = false;
  isRotatedProduct = false;
  isRotatedLevel = false;
  isremoveDiscount=false;
  // selectedFiles: any; 
  submit = false;
  select = "";
  categorySelected = "";
  currencyList: any = ['£', 'TDN', '$', 'd'];
  currencySelected = '';
  categoryList: String[] = ["Phone & Electronique", "Clothes & Fashion", "Gaming & Digitals", "Sprots & Entertainement", "SelfCare & Product", "Kitchen & Home essentials", "Baby & Toy", "Books & Education", "Car & Accessoires", "Animals", "Magasin"];
  previewUrls: string[] = [];
  selectedFiles: File[] = [];
  statusSelected: string[] = ['In Stock', 'Out of Stock ', 'Available on Order', 'Pre-order', 'Coming Soon', 'Unavailable ']
  productList: String[] = ["Please Select product First"];
  levelList: String[] = ['New', 'A1', 'A2', 'B1', 'B2', 'C1', 'D1', 'D2'];
  productSelected = '';
  levelSelected = '';
  isBrand = false;
  isQuality = false;
  isSize = false;
  isWeight = false;
  isDimension = false;
  isMaterial = false;
  isAuthor = false;
  isFlavor = false;
  isGender = false;
  isColors = false;
  selectedColors: string[] = [];
  isSelectColor=false;
  selectedSize: string[] = [];
  selectedDiscount: any;
  discount_price: any;
  discount_percentage: any;
  id_discount:any;
  isProducts = false;
  products: any[] = [];
  src = "";
  photos: any;
  id_photo: any;
  id_images: number[] = [];
  images: any[] = [];
  currentIndex = 0;
  currentIndexes: { [productId: number]: number } = {};
  id_product: any;
  isRotated = false;
  DeleteMessage: any;
  DeletePhotoMessage: any;
  errorDelete: any;
  isDeleteProduct=false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.isRotated = !this.isRotated;
  }
  isModalOpen = false;
  isPhotoModalOpen = false;
  isModalDeleteOpen = false;
  isModalDeletePhoto=false;
  isModalDiscountOpen=false;

   openDiscountModal(id: any) {
  this.isModalDiscountOpen=true;
  this.id_product=id;
      this.productService.getProductById(this.id_product).subscribe({
      next: (res) => {
        this.product=res;

         }
    })
  console.log('id discount',this.id_discount);

  }
  openModal(id: any) {
    this.isModalOpen = true;
    this.id_product = id;    
    this.productService.getProductById(this.id_product).subscribe({

      next: (res) => {
        this.product=res;
      if (this.product?.color) {
    this.selectedColors = [...this.product.color];
  }
        console.log('product', this.selectedColors);

        console.log('product', this.product);
                  this.photos = this.product.photos;

          this.photos.forEach((image: { id_photo: any; src: string; }) => {
            this.photoService.getPhoto(image.id_photo).subscribe(
              blob => {
                const objectURL = URL.createObjectURL(blob);
                console.log("content blob", blob);
                image.src = objectURL;
              }
            )
          })
      }
    })
    console.log("id", id);
    console.log("this.id_product", this.id_product);
  }
  openDeletePhotoModal(id: any) {
    this.isModalDeletePhoto = true;
    this.id_photo=id;    
  }
  openPhotoModal(id: any) {
    this.isPhotoModalOpen = true;
    this.id_product = id;    
    this.productService.getProductById(this.id_product).subscribe({
      next: (res) => {
        this.product=res;
        console.log('product', this.product);
                  this.photos = this.product.photos;
          this.photos.forEach((image: { id_photo: any; src: string; }) => {
            this.photoService.getPhoto(image.id_photo).subscribe(
              blob => {
                const objectURL = URL.createObjectURL(blob);
                console.log("content blob", blob);
                image.src = objectURL;
              }
            )
          })
      }
    })
    console.log("id", id);
    console.log("this.id_product", this.id_product);
  }
  closeModal() {
    this.isModalOpen = false;
    this.isPhotoModalOpen=false;
    this.isModalDeleteOpen=false;
  this.isModalDiscountOpen=false;

  }

  toggleDeleteDropdown() {
    this.isModalDeleteOpen = !this.isModalDeleteOpen;
    this.isRotated = !this.isRotated;
  }

  openModalDelete(id: any) {
    this.isModalDeleteOpen = true;
    this.isDeleteProduct=true;
    this.id_product = id;
    console.log("isModalDeleteOpen", this.isModalDeleteOpen);
    console.log("this.id_product", this.id_product)
  }
  openModalDeleteDiscount() {
    this.isModalDeleteOpen = true;
    this.isremoveDiscount=true;
    console.log('id_product: ', this.id_product)
  }
  closeModalDelete() {
    this.isModalDeleteOpen = false;
  }
   closeModalDeletePhoto() {
    this.isModalDeletePhoto = false;
  }
  toggleDropdownCurrency() {
    this.isDropdownCurrencyOpen = !this.isDropdownCurrencyOpen;
    this.isRotatedCurrency = !this.isRotatedCurrency;
    this.isRotatedCategory = false;
    this.isRotatedStatus = false
    this.isDropdownCategoryOpen = false;
    this.isDropdownStatusOpen = false
    this.isDropdownLevelOpen = false
    this.isRotatedLevel = false;
    this.isDropdownProductOpen = false
    this.isRotatedProduct = false
  }
  toggleDropdownStatus() {
    this.isDropdownStatusOpen = !this.isDropdownStatusOpen;
    this.isDropdownCategoryOpen = false;
    this.isDropdownCurrencyOpen = false
    this.isRotatedStatus = !this.isRotatedStatus;
    this.isRotatedCategory = false;
    this.isRotatedCurrency = false
    this.isDropdownLevelOpen = false
    this.isRotatedLevel = false;
    this.isDropdownProductOpen = false
    this.isRotatedProduct = false
  }
  toggleDropdownCategoris() {
    this.isDropdownCategoryOpen = !this.isDropdownCategoryOpen;
    this.isDropdownCurrencyOpen = false
    this.isDropdownStatusOpen = false
    this.isRotatedCategory = !this.isRotatedCategory
    this.isRotatedCurrency = false
    this.isRotatedStatus = false
    this.isDropdownProductOpen = false
    this.isRotatedProduct = false
    this.isDropdownLevelOpen = false
    this.isRotatedLevel = false;
  }
  toggleDropdownProduct() {
    this.isDropdownProductOpen = !this.isDropdownProductOpen;
    this.isRotatedProduct = !this.isRotatedProduct;
    this.isDropdownCurrencyOpen = false;
    this.isDropdownStatusOpen = false;
    this.isRotatedCategory = false;
    this.isRotatedCurrency = false;
    this.isRotatedStatus = false;
    this.isDropdownCategoryOpen = false;
    this.isDropdownLevelOpen = false
    this.isRotatedLevel = false;
  }
  toggleDropdownLevel() {
    this.isDropdownLevelOpen = !this.isDropdownLevelOpen;
    this.isRotatedLevel = !this.isRotatedLevel;
    this.isDropdownProductOpen = false;
    this.isDropdownCurrencyOpen = false;
    this.isDropdownStatusOpen = false;
    this.isRotatedCategory = false;
    this.isRotatedCurrency = false;
    this.isRotatedStatus = false;
    this.isDropdownCategoryOpen = false;

  }
  selectColors(event: Event): void {
    this.isSelectColor=true;
    const input = event.target as HTMLInputElement;
    const color = input.value;
    const exists = this.selectedColors.some(c => c === color);
    console.log('exist',exists)
    if (!this.selectedColors.includes(color) ) {
      this.selectedColors.push(color);
    }
    console.log('Updated color list:', this.selectedColors);
  }
  deleteColor(colorToDelete: String) {
    this.selectedColors = this.selectedColors.filter(color => color !== colorToDelete);
  }
  selectSize(event: Event): void {
    const input = event.target as HTMLInputElement;
    const size = input.value;
    const exists = this.selectedSize.some(s => s === size);
    if (!this.selectedSize.includes(size) ) {
      this.selectedSize.push(size);
    }
    console.log('Updated size list:', this.selectedSize);
  }
  selectdiscount(event: any): void {
   this.selectedDiscount=event;
   this.discount_percentage=this.selectedDiscount;
   console.log('percentage percent',this.discount_percentage)

  }
  deletesize(sizeToDelete: String) {
    this.selectedSize = this.selectedSize.filter(size => size !== sizeToDelete);
  }
  selectStatus(status: string) {
    this.select = status;
    this.status = status;
    console.log("selected Status", status)
  }
  selectCategory(type: any) {
    this.type = type;
    this.categorySelected = this.type;
    console.log('category', this.type);
    if (this.type == "Phone & Electronique") {
      this.productList = ['Smartphones', 'Feature Phones', 'Phone Accessories', 'Smart Devices', 'Computers & Accessories', 'TVs & Home Entertainment', 'Audio Devices', 'Wearable Tech', 'Home Appliances', 'Smart Home Devices', 'Gaming', 'Office & Tools', 'Cameras'];
      this.isBrand = true;
      this.isWeight = true
      this.isDimension = true;
      this.isMaterial = true;
      this.isQuality = false;
      this.isSize = false;
      this.isAuthor = false;
      this.isFlavor = false;
      this.isGender = false;
      this.isColors = true;
    } else if (this.type == "Clothes & Fashion") {
      this.productList = ['Tops', 'Bottoms', 'Dresses & Suits', 'Outerwear', 'Undergarments & Loungewear', 'Activewear / Sportswear', 'Traditional & Cultural Wear ', 'Footwear', 'Bags & Wallets', 'Eyewear', 'Headwear', 'Jewelry & Watches', 'Other accessories', 'Swimwear', 'Winter wear', 'Rainwear']
      this.isBrand = true;
      this.isQuality = true;
      this.isSize = true;
      this.isGender = true;
      this.isWeight = false;
      this.isDimension = false;
      this.isMaterial = false;
      this.isAuthor = false;
      this.isFlavor = false;
      this.isColors = true;

    } else if (this.type == "SelfCare & Product") {
      this.isBrand = true;
      this.isQuality = true;
      this.isWeight = true
      this.isMaterial = true;
      this.isGender = true;
      this.isSize = false;
      this.isWeight = false;
      this.isDimension = false;
      this.isAuthor = false;
      this.isFlavor = false;
      this.productList = ['Personal Hygiene', 'Skincare', 'Bath & Body Care', 'Hair Care', 'Beauty & Makeup', 'Wellness & Relaxation', 'Grooming Products', 'Fragrance', 'Tools & Accessories', 'Baby & Sensitive Care']
      this.isBrand = true;
      this.isColors = true;

    } else if (this.type == "Books & Education") {
      this.productList = ['Books', 'Educational Supplies', "Digital Learning & Media", "Educational Kits & Tools ", "Classroom & Teaching Materials", "Early Learning & Kids’ Education", "Academic Categories", "Learning Equipment & Devices"];
      this.isQuality = true;
      this.isWeight = true
      this.isDimension = true;
      this.isAuthor = true;
      this.isBrand = false;
      this.isSize = false;
      this.isMaterial = false;
      this.isFlavor = false;
      this.isGender = false;
      this.isColors = true;

    } else if (this.type == "Animals") {
      this.productList = ["Food", "Treats", "Toys", "Beds", "Leashes & Collars", "Grooming Products", "Litter Boxes", "Aquariums", "Filters & Pumps", "Aquarium Decorations", "Cages", "Terrariums"]
      this.isBrand = true;
      this.isQuality = true;
      this.isSize = true;
      this.isWeight = true
      this.isDimension = true;
      this.isMaterial = true;
      this.isFlavor = true;
      this.isGender = true;
      this.isAuthor = false;
      this.isColors = true;

    } else if (this.type == "Kitchen & Home essentials") {
      this.productList = ["Kitchen", "Cleaning & Maintenance", "Bedroom & Living", "Bathroom", "Miscellaneous"]
      this.isBrand = true;
      this.isWeight = true
      this.isDimension = true;
      this.isMaterial = true;
      this.isQuality = false;
      this.isSize = false;
      this.isAuthor = false;
      this.isFlavor = false;
      this.isGender = false;
      this.isColors = true;

    } else if (this.type == "Sprots & Entertainement") {
      this.productList = ["Sports & Fitness", "Gaming & Digital Entertainment", "Board & Table Games", "Music & Instruments", "Events & Social Fun"]
      this.isBrand = true;
      this.isQuality = true;
      this.isSize = true;
      this.isWeight = true
      this.isDimension = true;
      this.isMaterial = true;
      this.isAuthor = false;
      this.isFlavor = false;
      this.isGender = false;
      this.isColors = true;

    } else if (this.type == "Gaming & Digitals") {
      this.productList = ["Gaming Hardware", "Accessories", "Digital Content", "Streaming & Creator Gear", " Mobile & Cloud Gaming", "Software & Subscriptions"]
      this.isBrand = true;
      this.isQuality = false;
      this.isSize = false;
      this.isWeight = false;
      this.isDimension = false;
      this.isMaterial = false;
      this.isAuthor = false;
      this.isFlavor = false;
      this.isGender = false;
      this.isColors = true;

    } else if (this.type == "Car & Accessoires") {
      this.productList = ["Car Care & Maintenance", "Interior Accessories", "Tech & Electronics", "Tools & Safety", " Exterior & Transport"]
      this.isBrand = true;
      this.isSize = true;
      this.isWeight = true;
      this.isDimension = true;
      this.isMaterial = true;
      this.isQuality = false
      this.isSize = false;
      this.isAuthor = false;
      this.isFlavor = false;
      this.isGender = false;
      this.isColors = true;

    } else if (this.type == "Baby & Toy") {
      this.productList = ["Baby Clothing",
        "Baby Shoes & Booties",
        "Baby Diapers & Wipes",
        "Baby Skincare & Bath Products",
        "Baby Bottles & Feeding Accessories",
        "Breastfeeding Supplies",
        "Pacifiers & Teethers",
        "Baby Food & Formula",
        "High Chairs & Boosters",
        "Baby Bibs & Burp Cloths",
        "Baby Blankets & Swaddles",
        "Baby Towels & Washcloths",
        "Changing Tables & Pads",
        "Cribs & Bassinets",
        "Baby Mattresses & Bedding",
        "Strollers & Travel Systems",
        "Car Seats",
        "Baby Carriers & Slings",
        "Baby Monitors",
        "Safety Gates & Cabinet Locks",
        "Night Lights & White Noise Machines",
        "Playpens & Play Mats",
        "Activity Gyms & Baby Bouncers",
        "Walkers & Jumpers",
        "Infant Toys",
        "Toddler Toys",
        "Preschool Toys",
        "Educational Toys",
        "Building Blocks & Construction Toys",
        "Dolls & Dollhouses",
        "Action Figures",
        "Toy Vehicles",
        "Puzzles & Board Games",
        "Outdoor Toys",
        "Ride-on Toys & Scooters",
        "Stuffed Animals & Plush Toys",
        "Arts & Crafts for Kids",
        "Musical Toys",
        "Pretend Play Sets",
        "Bath Toys",
        "Remote Control Toys",
        "STEM Toys"]
      this.isBrand = true;
      this.isQuality = true;
      this.isSize = true;
      this.isWeight = true
      this.isDimension = true;
      this.isMaterial = true;
      this.isGender = true;
      this.isAuthor = false;
      this.isFlavor = false;
    } if (this.type == "Magasin") {
      this.productList = [
        "Alimentation & Boissons",
        "Produits frais",
        "Épicerie sèche",
        "Produits surgelés",
        "Boissons alcoolisées & non alcoolisées",
        "Produits ménagers & nettoyage",
        "Hygiène & Beauté",
        "Santé & Pharmacie",
        "Vêtements & Mode",
        "Chaussures & Accessoires",
        "Électronique & Multimédia",
        "Maison & Décoration",
        "Cuisine & Ustensiles",
        "Jardinage & Extérieur",
        "Jouets & Loisirs",
        "Bricolage & Outillage",
        "Papeterie & Fournitures de bureau",
        "Animaux & Accessoires",
        "Livres & Presse"
      ]
      this.isBrand = true;
      this.isSize = true;
      this.isWeight = true;
      this.isFlavor = true;
      this.isQuality = false;
      this.isDimension = false;
      this.isMaterial = false;
      this.isAuthor = false;
      this.isGender = false;
      this.isColors = true;

    }
  }
  SelectCurrency(currency: any) {
    this.currency = currency;
    this.currencySelected = this.currency;
  }
  SelectProduct(product: any) {
    this.product = product;
    this.productSelected = this.product;
  }
  SelectLevel(level: any) {
    this.level = level;
    this.levelSelected = this.level;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isButton = target.closest('.title_dropdown');
    const isInsideDropdown = target.closest('.dropdown');
    const isDeleteButton = target.closest('.close');
    const isModel = target.closest('.modal-overlay');
    const isInsideModal = target.closest('.modal');
    const model=target.closest('modal-overlay-delete');

    if (!isButton && !isInsideDropdown) {
      this.isDropdownOpen = false;
      this.isRotated = true;
      console.log('isRoteted', this.isRotated);
      console.log('isDropdownOpen (false)', this.isDropdownOpen);
      console.log("status: ", this.statusSelected);
      this.isDropdownOpen = false;
      this.isDropdownCurrencyOpen = false;
      this.isDropdownStatusOpen = false;
      this.isDropdownCategoryOpen = false;
      this.isDropdownLevelOpen = false;
      this.isDropdownProductOpen = false;
      this.isRotatedCurrency = false;
      this.isRotatedCategory = false;
      this.isRotatedStatus = false;
      this.isRotatedProduct = false;
      this.isRotatedLevel = false;
    }
    if (isDeleteButton) {
      this.isModalDeleteOpen = false;
    }
    if (isModel && !isInsideModal) {
      this.isModalOpen = false;
      this.isModalDeleteOpen = false;
      this.isModalDeletePhoto=false;
    }

  }
  constructor(private productService: ProductService, private photoService: PhotoService,  private discountService: DiscountService ,private router: Router) { }
  ngOnInit(): void {
    this.productService.GetProductsByAdmin(localStorage.getItem('id_admin')).subscribe({
      next: (res) => {
        this.products = res;
        if (this.products) {
          this.isProducts = !this.isProducts;
        } else {
          this.isProducts = false;
        }
        console.log("products", this.products);
        this.products.forEach(product => {
          this.photos = product.photos;
          this.photos.forEach((image: { id_photo: any; src: string; }) => {
            this.photoService.getPhoto(image.id_photo).subscribe(
              blob => {
                const objectURL = URL.createObjectURL(blob);
                image.src = objectURL;
              }
            )
          })
        })


      },
      error: (err) => {
        console.log("error", err);

      }
    })

    this.loadProduits();
    this.DeleteMessage = localStorage.getItem("DeleteMessage");
    this.errorDelete = localStorage.getItem("errorDelete");
    if (this.errorDelete) {
      setTimeout(() => {
        localStorage.removeItem("errorDelete");
        this.errorDelete = null;
      }, 8000);
    }
    if (this.DeleteMessage) {
      setTimeout(() => {
        localStorage.removeItem("DeleteMessage");
        this.DeleteMessage = null;
      }, 8000);
    }
    if (this.DeleteMessage) {
      setTimeout(() => {
        localStorage.removeItem("DeleteMessage");
        this.DeleteMessage = null;
      }, 8000);
    }
    this.DeletePhotoMessage = localStorage.getItem("deletePhoto");
      if (this.DeletePhotoMessage) {
      setTimeout(() => {
        localStorage.removeItem("deletePhoto");
        this.DeletePhotoMessage = localStorage.getItem("deletePhoto");
        console.log(this.DeletePhotoMessage)
      }, 8000);
    }
         this.uploadMessage = localStorage.getItem("uploadMessage");
      if (this.uploadMessage) {
      setTimeout(() => {
        localStorage.removeItem("uploadMessage");
        this.uploadMessage = localStorage.getItem("uploadMessage");
        console.log(this.uploadMessage)
      }, 8000);
    }

  }
  getCurrentIndex(productId: number): number {
    return this.currentIndexes[productId] ?? 0;
  }
  nextSlide(productId: number, max: number): void {
    console.log("max", max)
    const current = this.getCurrentIndex(productId);
    console.log("current", current)
    if (current < max) {
      this.currentIndexes[productId] = current + 1;
      console.log("current2", this.currentIndexes[productId])
    }
  }
  prevSlide(productId: number): void {
    const current = this.getCurrentIndex(productId);
    if (current > 0) {
      this.currentIndexes[productId] = current - 1;
    }

  }

  getPhotosProduct(id: any) {
    this.photoService.getPhotos(id).subscribe(
      blob => {
        const objectURL = URL.createObjectURL(blob);
        console.log("content blob", blob)
        this.src = objectURL;
      }
    )
  }
  getPhoto(id: any) {
    this.photoService.getPhoto(id).subscribe(
      blob => {
        const objectURL = URL.createObjectURL(blob);
        console.log("content blob", blob)
        this.src = objectURL;
        console.log("image", this.src)
      }
    )
  }

  loadProduits() {
    this.productService.GetProductsByAdmin(localStorage.getItem('id_admin')).subscribe(prods => {
      this.products = prods;
      this.products.forEach(product => {
        product.photos.forEach((photo: { id_photo: any; src: string; }) => {
          this.photoService.getPhoto(photo.id_photo).subscribe(blob => {
            const objectURL = URL.createObjectURL(blob);
            photo.src = objectURL;
          });
        });
      });
    });
  }

  toAddProduct() {
    this.router.navigate(['/addProduct/', localStorage.getItem('token')])
  }
  editProduct(id: any) {
    console.log('id tesst', id);
    const productBody = {
      cost_price: this.product.cost_price,
      sale_price: this.product.sale_price,
      name: this.product.name,
      description: this.product.description,
      qte: this.product.qte,
      type: this.product.type,
      product: this.product.product,
      currency: this.product.currency,
      quality: this.product.quality,
      brand: this.product.brand,
      status: this.product.status,
      color: this.selectedColors,
      size: this.selectedSize,
      Weight: this.product.Weight,
      dimensions: this.product.dimensions,
      material: this.product.material,
      author: this.product.author,
      flavor: this.product.flavor,
      gender: this.product.gender,
      level: this.product.level,
      stock: this.product.stock,
    }
    this.productService.editProduct(id, productBody).subscribe({
      next: (res) => {
        console.log("new version of product", res);
        localStorage.setItem('DeleteMessage','You have successfully updated the product.')
      this.DeleteMessage=localStorage.getItem('DeleteMessage');
        window.location.reload();
      },
      error: (err) => {
        console.log("error edit", err);
      }
    })
  }
  OnsumbitDiscount(id:any){
const Discount={
  discount_price: this.discount_price,
  discount_percentage: this.discount_percentage,
}
  this.discountService.AddDiscount(id,Discount).subscribe({
    next:(res)=>{
      localStorage.setItem('DeleteMessage','You have successfully added discount.')
      this.DeleteMessage=localStorage.getItem('DeleteMessage');
        window.location.reload();
      
    },
  })

  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log('delete product', res);
        localStorage.setItem("DeleteMessage", "You have successfully deleted the product.");
        this.DeleteMessage = localStorage.getItem("DeleteMessage");
        // window.location.reload();
        this.isModalDeleteOpen = false;
      },
      error: (err) => {
        console.log('error delete product', err);
        localStorage.setItem("errorDelete", "Error: Failed to delete the product.")
        this.errorDelete = localStorage.getItem("errorDelete");
        // window.location.reload();
      }
    })
  }

  addDiscount(id: any) {
    const discount = {
      discount_price: this.discount_price,
      discount_percentage: this.discount_percentage
    }
    this.productService.addDiscount(id, discount).subscribe({
      next: (res) => {
        console.log('discount body', res)
      },
      error: (err) => {
        console.log('error discount', err)

      }
    })
  }
  DeletePhoto(id: any) {
    this.photoService.deletePhoto(id).subscribe({
      next: (res) => {
        console.log('delete photo', res)
        localStorage.setItem("deletePhoto","You have successfully deleted the image.")
        this.DeletePhotoMessage=localStorage.getItem("deletePhoto");
        console.log("DeleteMessage photo",this.DeletePhotoMessage)
        this.isModalDeletePhoto=false;
        window.location.reload();
      },
      error: (err) => {
        console.log('error delete photo', err)

      }
    })
  }
   onSubmit(id:any): void {
    if (this.selectedFiles.length === 0) {
      alert('Please select at least one image.');
      return;
    }

    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('images', file);
    });
    this.productService.AddPhoto(id, this.selectedFiles).subscribe({
      next: res => {
        console.log('Upload successful', res);
        // alert("Upload succeded");
         localStorage.setItem('uploadMessage','Upload successful!');
         this.uploadMessage = localStorage.getItem('uploadMessage');
        this.errorMessage = '';
        this.selectedFiles = [];
        console.log('selectedFiles', this.selectedFiles)
        window.location.reload();
      },
      error: err => {
        console.error('Upload failed', err);
        alert("Upload failed");
      }
    });
  }
   onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const newFiles = Array.from(input.files);

    // Avoid duplicates based on name + size
    newFiles.forEach(file => {
      const exists = this.selectedFiles.some(
        f => f.name === file.name && f.size === file.size
      );
      if (!exists) {
        this.selectedFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => this.previewUrls.push(e.target.result);
        reader.readAsDataURL(file);
      }
    });

    // Reset file input so same file can be re-selected if needed
    input.value = '';
  }

  RemoveDiscount(){
    this.productService.RemoveDiscount(this.id_product).subscribe({
      next:(res)=>{
        console.log("resultat remove product",res);
        localStorage.setItem('DeleteMessage','You have successfully delete discount this product.')
        this.DeleteMessage=localStorage.getItem('DeleteMessage');
        this.isModalDeleteOpen = false;

      }
    })
  }
  opemModalRemoveDiscount(){
    this.isremoveDiscount=true;
  }
}

