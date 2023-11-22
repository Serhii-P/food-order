'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

// function AuthLinks({status, userName}) {
//   if (status === 'authenticated') {
//     return (
//       <>
//         <Link href={'/profile'} className="whitespace-nowrap">
//           Hello, {userName}
//         </Link>
//         <button
//           onClick={() => signOut()}
//           className="bg-primary rounded-full text-white px-8 py-2">
//           Logout
//         </button>
//       </>
//     );
//   }
//   if (status === 'unauthenticated') {
//     return (
//       <>
//         <Link href={'/login'}>Login</Link>
//         <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
//           Register
//         </Link>
//       </>
//     );
//   }
// }

const Header = () => {
  const session = useSession();
  console.log('header session - ', session);
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  return (
    <header>
      <div className="flex items-center  justify-between">
        <Link className="text-primary font-semibold text-2xl" href={"/"}>
          ST PIZZA
        </Link>
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
        </nav>
        <nav>
          {status === "authenticated" && (
            <>
              <Link href={"/profile"} className="whitespace-nowrap">
                Hello, {userName}
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-primary rounded-full text-white px-8 py-2"
              >
                Logout
              </button>
            </>
          )}
          {status === "unauthenticated" && (
            <>
              <Link href={"/login"}>Login</Link>
              <Link
                href={"/register"}
                className="bg-primary rounded-full text-white px-8 py-2"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
