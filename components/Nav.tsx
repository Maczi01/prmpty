'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react';

import { BuiltInProviderType } from '@node_modules/next-auth/providers';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
      setUpProviders().catch(e => console.log(e));
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PRMPTY</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user
? (
  <div className="flex gap-3 md:gap-5">
    <Link href="/create-prompt" className="black_btn">
      Create Post
    </Link>

    <button
      type="button"
      onClick={async () => await signOut()}
      className="outline_btn"
    >
      Sign Out
    </button>

    <Link href="/profile">
      <Image
        src={session?.user?.image ?? ''}
        width={37}
        height={37}
        className="rounded-full"
        alt="profile"
      />
    </Link>
  </div>
        )
: (
  <>
    {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id).then((r) => console.log(r));
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
  </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user
? (
  <div className="flex">
    <Image
      src={session?.user.image ?? ''}
      width={37}
      height={37}
      className="rounded-full"
      alt="profile"
      onClick={() => setToggleDropdown(!toggleDropdown)}
    />

    {toggleDropdown && (
    <div className="dropdown">
      <Link
        href="/profile"
        className="dropdown_link"
        onClick={() => setToggleDropdown(false)}
      >
        My Profile
      </Link>
      <Link
        href="/create-prompt"
        className="dropdown_link"
        onClick={() => setToggleDropdown(false)}
      >
        Create Prompt
      </Link>
      <button
        type="button"
        onClick={() => {
                    setToggleDropdown(false);
                    void signOut().then((r) => r);
                  }}
        className="mt-5 w-full black_btn"
      >
        Sign Out
      </button>
    </div>
            )}
  </div>
        )
: (
  <>
    {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id).then((r) => console.log(r));
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
  </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
