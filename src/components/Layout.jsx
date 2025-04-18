import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import TopNavigation from "./TopNavigation/TopNavigation";
import Categories from "./Categories/Categories";
import LongPage from "../Pages/LongPage/LongPage";
import UserForm from "./User/UserForm";

export default function Layout() {
  return (
    <>
      <UserForm />
      <div className="container">
        <TopNavigation />
        <div className='main-promo container'>
          <Categories />
          <Outlet />
        </div>
        <main>
          <LongPage />
          <Footer />
        </main>
      </div>
    </>
  )
}