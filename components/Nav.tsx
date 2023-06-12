'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {signIn, signOut, useSession, getProviders, LiteralUnion} from 'next-auth/react'
import {ClientSafeProvider} from 'next-auth/react'
import {BuiltInProviderType} from "@node_modules/next-auth/providers";

const Nav = () => {
    const {data: session} = useSession();
    console.log('session: ', session)
    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)
    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };
        fetchProviders();
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="assets/images/logo.svg"
                    alt="PRMPTY logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">
                    PRPMTY
                </p>
            </Link>
            <div className="sm:flex hidden">
                {
                    session ? (
                        <div className="flex gap-3 md:gap-5">
                            <Link href="/create-prompt" className="black_btn">
                                Create post
                            </Link>
                            <button type='button' onClick={() => signOut()} className="outline_btn">
                                Sign out
                            </button>
                            <Link href="/login" className="outline_btn">
                                <Image
                                    src="assets/images/logo.svg"
                                    width={37}
                                    height={37}
                                    alt="user"

                                />
                            </Link>
                        </div>
                    ) : (
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button
                                        type="button"
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className="blck_btn"
                                    >
                                        Sign in
                                    </button>
                                ))
                            }
                        </>
                    )
                }
            </div>

            <div className="sm:hidden flex relative z-50">
                {session ? (
                    <div className="flex">
                        <Image
                            src="assets/images/logo.svg"
                            width={37}
                            height={37}
                            alt="user"
                            onClick={() => setToggleDropdown(prev => !prev)}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >My profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >Create Prompt
                                </Link>
                                <button
                                    type={'button'}
                                    onClick={() => {
                                        setToggleDropdown(false)
                                        signOut()
                                    }
                                    }
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign out
                                </button>
                            </div>
                        )
                        }
                    </div>) : (
                    <>
                        {
                            providers && Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="blck_btn"
                                >
                                    Sign in
                                </button>
                            ))
                        }
                    </>
                )
                }
            </div>

        </nav>
    );
};

export default Nav
