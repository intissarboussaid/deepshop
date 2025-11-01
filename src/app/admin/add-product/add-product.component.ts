import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { ProductService } from '../../Services/Product/product.service';
import { FormArray, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { ColorsBody } from './detailsProduct';

@Component({
  selector: 'app-add-product',
  imports: [NavbarComponent, FormsModule, HttpClientModule, NgIf, NgFor, NgStyle],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})

export class AddProductComponent {  
  isclicked=false;
  cost_price = 0.0;
  sale_price = 0.0;
  clickCount=1;
  name = '';
  description = '';
  product: any;
  currency: any;
  // color: any;
  // size: any;
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
  // qte = 0;
  type: any;
  quality: any;
  brand: any;
  percent = 0.0;
  photo?: File[];
  invalid = "";
  uploadMessage = '';
  errorMessage: any;
  successMessage: any;
  currentColor:any;
  currentSize:any;
  currentQuantity:any;
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
  selectedSize: string[] = [];
  detailsList:any[]=[];
  color_size_qte: { color: any; size: any; qte: any }[] = [];


  constructor(private productService: ProductService) { }
  onSubmit(form: NgForm) {
    if (form.valid && this.currencySelected != '' && this.levelSelected != '', this.productSelected != '' && this.sale_price != null) {
      const productBody = {
        cost_price: this.cost_price,
        sale_price: this.sale_price,
        name: this.name,
        description: this.description,
        // qte: this.qte,
        type: this.type,
        product: this.product,
        currency: this.currency,
        quality: this.quality,
        brand: this.brand,
        status: this.status,
        color: this.selectedColors,
        size: this.selectedSize,
        Weight: this.Weight,
        dimensions: 'width:' + this.width + 'height: ' + this.height + 'hauteur:' + this.hauteur,
        material: this.material,
        author: this.author,
        flavor: this.flavor,
        gender: this.gender,
        level: this.level,
        stock: this.stock,
        color_size_qte:this.color_size_qte
      }
      this.productService.AddProduct(localStorage.getItem('id_admin'), productBody, this.selectedFiles)
        .subscribe({
          next: (res) => {
            console.log('Product added:', res);
            localStorage.setItem('id_product', res.id_product);
            this.uploadMessage = 'Upload successful!';
            this.errorMessage = '';
            this.selectedFiles = [];
            console.log('selectedFiles', this.selectedFiles);
            localStorage.setItem('successMessage', 'The product has been added successfully.')
            this.successMessage = localStorage.getItem('successMessage');
            console.log('siccesMessage', this.successMessage)
            localStorage.setItem('type', res.type);
            window.location.reload();
          },
          error: (err) => {
            console.error('Error:', err);
            localStorage.setItem('errorMessage', 'Please select at least one image.')
            this.errorMessage = localStorage.getItem('errorMessage');
            window.location.reload();

          }
        });
    } else {
      this.invalid = "There is something missing. Please check!"
      setTimeout(() => {
        this.invalid = "";
      }, 8000);
    }


  }
  ngOnInit() {
    // console.log('details product ', this.colorsBody)
    // console.log('dropdown Status', this.isDropdownStatusOpen)
    // console.log('dropdown currency', this.isDropdownStatusOpen)
    // console.log('cayegory:  ', this.categorySelected)
    // console.log('product list', this.productList);

    // console.log('local : ', localStorage.getItem('successMessage'))
    this.successMessage = localStorage.getItem('successMessage');
    // console.log('successMessage : ', this.successMessage)

    if (this.successMessage) {
      setTimeout(() => {
        localStorage.removeItem('successMessage');
        this.successMessage = null;
      }, 8000);
    }
    this.errorMessage = localStorage.getItem('errorMessage');
    if (this.errorMessage) {
      setTimeout(() => {
        localStorage.removeItem('errorMessage')
        this.errorMessage = null;

      }, 8000);
    }
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
  // ondetailsproductSelected(details:any){
  //   this.color=details.color; 
  //   this.size=details.size;
  //   this.qte=details.qte;
  //    this.detailsList.push({
  //     color: this.color,
  //     size: this.size,
  //     qte: this.qte,
  //   });
  //   console.log("details",details)
  // }
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
    const input = event.target as HTMLInputElement;
    const color = input.value;
    const exists = this.selectedColors.some(c => c === color);
    if (!exists) {
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
    if (!exists) {
      this.selectedSize.push(size);
    }
    console.log('Updated size list:', this.selectedSize);
  }
  deletesize(sizeToDelete: String) {
    this.selectedSize = this.selectedSize.filter(size => size !== sizeToDelete);
  }
  upload(): void {
    if (!this.selectedFiles.length) {
      this.errorMessage = 'Please select at least one file';
      return;
    }
    console.log(this.selectedFiles);
    this.productService.UploadPhotosProduct(localStorage.getItem('id_product'), this.selectedFiles).subscribe({
      next: res => {
        console.log('Upload successful', res);
        alert("Upload succeeded");
        this.uploadMessage = 'Upload successful!';
        this.errorMessage = '';
        this.selectedFiles = [];
        console.log('selectedFiles', this.selectedFiles)
      },
      error: err => {
        console.error('Upload failed', err);
        alert("Upload failed");
      }
    });
  }
  onSubmitFile(): void {
    if (this.selectedFiles.length === 0) {
      alert('Please select at least one image.');
      return;
    }

    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('images', file);
    });
    this.productService.UploadPhotosProduct(localStorage.getItem('id_product'), this.selectedFiles).subscribe({
      next: res => {
        console.log('Upload successful', res);
        alert("Upload succeded");
        this.uploadMessage = 'Upload successful!';
        this.errorMessage = '';
        this.selectedFiles = [];
        console.log('selectedFiles', this.selectedFiles)
      },
      error: err => {
        console.error('Upload failed', err);
        alert("Upload failed");
      }
    });
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
      this.isFlavor = true;
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
      this.productList = ["Baby Clothes",
        "Feeding Essentials",
        "Hygiene & Baby Care",
        "Baby Toys",
        "Furniture & Accessories",
        "Bath Time",
        " Safety Products"]
      this.isBrand = true;
      this.isQuality = true;
      this.isSize = true;
      this.isWeight = true
      this.isDimension = true;
      this.isMaterial = true;
      this.isGender = true;
      this.isAuthor = false;
      this.isFlavor = false;
      this.isColors = true;

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
   addColorQteSier(){
    // this.isclicked=true;
    // this.clickCount++;
    // this.colorsBody.length=this.clickCount;
    // console.log("count click",this.clickCount);
      if (this.currentColor ||this.currentSize || this.currentQuantity >= 0) {
    this.color_size_qte.push({
      color: this.currentColor,
      size: this.currentSize,
      qte: this.currentQuantity,
    });
console.log("list detILS:",this.color_size_qte);
    // Reset inputs
    // this.currentColor='';
    // this.currentSize = '';
    // this.currentQuantity = 0;
  }
   }
//    get clickArray(): number[] {
//   return Array.from({ length: this.clickCount }, (_, i) => i);
// }
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
    const submit = target.closest('.btn');

    if (!isButton && !isInsideDropdown && !submit) {
      this.isDropdownProductOpen = false;
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
      this.submit = false;
      console.log('isDropdownOpen (false)', this.isDropdownOpen);
      console.log("status: ", this.statusSelected)
    }
    if (submit) {
      this.submit = !this.submit;
    }
  }
  // selectdetails(event: Event): void {    
  //   const input = event.target as HTMLInputElement;
  //   const details = input.value;
  //   const exists = this.colorsBody.some(c => c === details);
  //   if (!exists) {
  //     this.colorsBody.push(details);
  //   }
  //   console.log('Updated details list:', this.colorsBody);
  // }



 
}

