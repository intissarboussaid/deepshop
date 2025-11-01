import { Routes } from '@angular/router';
import { HomeComponent } from './homePage/home/home.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { SigninComponent } from './authentification/signin/signin.component';
import { HomeCategorisComponent } from './categorisPage/home-categoris/home-categoris.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ProfilComponent } from './Profils/profil/profil.component';
import { SettingComponent } from './Profils/setting/setting.component';
import { HistoriqueComponent } from './Profils/historique/historique.component';
import { FavoriteComponent } from './Profils/favorite/favorite.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DashbordComponent } from './user/dashbord/dashbord.component';
import { PmHomeComponent } from './productManger/pm-home/pm-home.component';
import { AllProductsComponent } from './admin/all-products/all-products.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CommandeComponent } from './commande/commande/commande.component';
import { OrderComponent } from './admin/order/order.component';
import { MagasinComponent } from './categorisPage/magasin/magasin.component';
import { AnimalsComponent } from './categorisPage/animals/animals.component';
import { CarAccessoiresComponent } from './categorisPage/car-accessoires/car-accessoires.component';
import { BookEducationComponent } from './categorisPage/book-education/book-education.component';
import { BabyToyComponent } from './categorisPage/baby-toy/baby-toy.component';
import { KitchenHomeEssentialsComponent } from './categorisPage/kitchen-home-essentials/kitchen-home-essentials.component';
import { SelfCareProductComponent } from './categorisPage/self-care-product/self-care-product.component';
import { SprotsEntertainementComponent } from './categorisPage/sprots-entertainement/sprots-entertainement.component';
import { GamingDigitalsComponent } from './categorisPage/gaming-digitals/gaming-digitals.component';
import { ClothesFashionComponent } from './categorisPage/clothes-fashion/clothes-fashion.component';
import { PhonelectroniqueComponent } from './categorisPage/phonelectronique/phonelectronique.component';
import { CustomersComponent } from './customers/customers.component';

export const routes: Routes = [
      { path: 'categoris', component: HomeCategorisComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'home_p', component: HomeComponent },
      { path: 'signUp', component: SignupComponent },
      
      { path: 'login', component: SigninComponent },
      { path: 'forgot-password', component: ForgetPasswordComponent },
      { path: 'profil/:token', component: ProfilComponent },
      { path: 'setting/:id', component: SettingComponent },
      { path: 'activateAccount', component: ActivateAccountComponent },
      { path: 'history/:id', component: HistoriqueComponent },
      { path: 'favorite', component: FavoriteComponent },
      { path: 'sidebar', component: SidebarComponent },
      { path: 'dashboard?admin/:id', component: DashboardComponent },
      // { path: 'userDashboard/:token', component: DashbordComponent },
      { path: 'allProducts/:token', component:AllProductsComponent },
      { path: 'addProduct/:token', component:AddProductComponent },
      { path: 'order?product/:id', component:OrderComponent },
      { path: 'customers?product/:id', component: CustomersComponent },
      { path: 'details?product/:id', component:ProductDetailsComponent },
      { path: 'productManagerDashboard/:token', component: PmHomeComponent},
      { path: 'commande/:token', component: CommandeComponent},
      { path: 'magasin', component: MagasinComponent},
      { path: 'animals', component: AnimalsComponent},
      { path: 'CarAccessoires', component: CarAccessoiresComponent},
      { path: 'Book&Education', component: BookEducationComponent},
      { path: 'BabyToy', component: BabyToyComponent},
      { path: 'HomeEssentials', component: KitchenHomeEssentialsComponent},
      { path: 'SelfCareProduct', component: SelfCareProductComponent},
      { path: 'Entertainement', component: SprotsEntertainementComponent},
      { path: 'GamingDigitals', component: GamingDigitalsComponent},
      { path: 'Clothes&Fashion', component: ClothesFashionComponent},
      { path: 'phone&Electronique', component: PhonelectroniqueComponent},
      { path: '', component: HomeCategorisComponent },
];
