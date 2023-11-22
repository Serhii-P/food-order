import UserTabs from "@/components/layout/UserTabs";
import Image from "next/image";
import Link from "next/link"
import { useState } from "react";

export const ProfilePage = () => {
  const session = useSession();

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [profileFetched, setProfileFetched] = useState(false);
  const {status} = session;

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile').then(response => {
        response.json().then(data => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        })
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      if (response.ok)
        resolve()
      else
        reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Error',
    });

  }

  if (status === 'loading' || !profileFetched) {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  const userImage = session.data.user.image;
  return (
    <section className="mt-8">
       <UserTabs isAdmin={isAdmin} />
      <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
      <Link
        // className={path === '/profile' ? 'active' : ''}
        // href={'/profile'}
      >
        Profile
      </Link>
      {/* {isAdmin && (
        <>
          <Link
            href={'/categories'}
            className={path === '/categories' ? 'active' : ''}
          >
            Categories
          </Link>
          <Link
            href={'/menu-items'}
            className={path.includes('menu-items') ? 'active' : ''}
          >
            Menu Items
          </Link>
          <Link
            className={path.includes('/users') ? 'active' : ''}
            href={'/users'}
          >
            Users
          </Link>
        </>
      )}
      <Link
        className={path === '/orders' ? 'active' : ''}
        href={'/orders'}
      >
        Orders
      </Link> */}
    </div>
      <div className="max-w-2xl mx-auto mt-8">
        {/* <UserForm user={user} onSave={handleProfileInfoUpdate} /> */}
        <div className="md:flex gap-4">
      <div>
        {/* <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div> */}
      </div>
      <div className="max-w-md mx-auto"
        // className="grow"
      
      >
        <div className="flex gap-4 items-center">
<div>
  <div className="rounded-lg p-2 relative">
<Image className="w-full rounded-lg h-full mb-1" src={userImage} alt="avatar"
width={250} height={250}  />
<button type="button">Edit</button>
  </div>
</div>
<form className="grow"
  // onSubmit={ev =>
        //   onSave(ev, {
        //     name:userName, image, phone, admin,
        //     streetAddress, city, country, postalCode,
        //   })
        // }
>
<input
          type="text" placeholder="First and last name"
          value={userName} onChange={ev => setUserName(ev.target.value)}
        />
        <input
          type="email"
          disabled={true}
          value={session.data.user.email}
          placeholder={'email'}
        />
</form>

        </div>
        {/* <label>
          First and last name
        </label>
        <input
          type="text" placeholder="First and last name"
          value={userName} onChange={ev => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={user.email}
          placeholder={'email'}
        /> */}
        {/* <AddressInputs
          addressProps={{phone, streetAddress, postalCode, city, country}}
          setAddressProp={handleAddressChange}
        /> */}
        {/* {loggedInUserData.admin && (
          <div>
            <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
              <input
                id="adminCb" type="checkbox" className="" value={'1'}
                checked={admin}
                onChange={ev => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )} */}
        <button type="submit">Save</button>
      </div>
    </div>
      </div>
    </section>
  )
}
