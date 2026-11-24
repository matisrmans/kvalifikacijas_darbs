import { Link, usePage } from '@inertiajs/react';
import { Leaf, Menu } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { dashboard, login, register } from '@/routes';

type Props = {
    children: ReactNode;
};

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About us', href: '/about' },
    { label: 'Solutions', href: '/#solutions' },
    { label: 'Sustainability', href: '/#sustainability' },
    { label: 'Find us', href: '/#map' },
    { label: 'Careers', href: '/careers/apply' },
    { label: 'Contact', href: '/contact' },
];

const footerColumns = [
    { title: 'Company', links: [{ label: 'About us', href: '/about' }] },
    {
        title: 'Job & career',
        links: [
            { label: 'Job openings', href: '/careers/apply' },
            { label: 'Why work here', href: '/about' },
        ],
    },
    {
        title: 'Downloads',
        links: [
            { label: 'Brochures', href: '/about' },
            { label: 'Sales conditions', href: '/about' },
        ],
    },
    {
        title: 'Contact us',
        links: [
            { label: 'Get in touch', href: '/contact' },
            { label: 'Sales representatives', href: '/contact' },
        ],
    },
];

export default function SiteLayout({ children }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { props, url } = usePage();
    const { auth } = props;
    const path = url.split('#')[0];

    const renderLink = (
        link: (typeof navLinks)[number],
        onClick?: () => void,
    ) => {
        const isActive = path === link.href;
        const className = `rounded-lg px-3 py-2 text-sm transition-colors md:rounded-none md:px-0 md:py-0 ${
            isActive ? 'text-white' : 'text-white/70 hover:text-white'
        }`;

        if (link.href.includes('#')) {
            return (
                <a
                    key={link.label}
                    href={link.href}
                    onClick={onClick}
                    className={className}
                >
                    {link.label}
                </a>
            );
        }

        return (
            <Link
                key={link.label}
                href={link.href}
                onClick={onClick}
                className={className}
            >
                {link.label}
            </Link>
        );
    };

    return (
        <div className="min-h-screen scroll-smooth bg-[#faf8f3] font-sans text-stone-900">
            <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#12291b]/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 lg:px-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white"
                    >
                        <Leaf className="size-6 text-[#8fc17a]" aria-hidden />
                        GroMedia
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => renderLink(link))}
                    </nav>

                    <div className="hidden items-center gap-4 md:flex">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="text-sm text-white/70 transition-colors hover:text-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="text-sm text-white/70 transition-colors hover:text-white"
                            >
                                Log in
                            </Link>
                        )}
                        <Link
                            href="/contact"
                            className="rounded-full bg-[#8fc17a] px-5 py-2 text-sm font-medium text-[#12291b] transition-colors hover:bg-[#a3d18f]"
                        >
                            Get in touch
                        </Link>
                    </div>

                    <button
                        type="button"
                        className="text-white md:hidden"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <Menu className="size-6" aria-hidden />
                    </button>
                </div>

                {menuOpen ? (
                    <nav className="flex flex-col gap-1 border-t border-white/10 bg-[#12291b] px-5 py-4 md:hidden">
                        {navLinks.map((link) =>
                            renderLink(link, () => setMenuOpen(false)),
                        )}
                        <Link
                            href="/contact"
                            onClick={() => setMenuOpen(false)}
                            className="mt-2 rounded-full bg-[#8fc17a] px-5 py-2 text-center text-sm font-medium text-[#12291b]"
                        >
                            Get in touch
                        </Link>
                    </nav>
                ) : null}
            </header>

            {children}

            <footer className="bg-[#12291b] px-5 py-16 text-white/70 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <p className="mb-12 max-w-3xl text-5xl leading-tight font-semibold tracking-tight text-white/15 lg:text-7xl">
                        Growing responsibly, together
                    </p>

                    <div className="grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
                        {footerColumns.map((column) => (
                            <div key={column.title}>
                                <h3 className="font-medium text-white">
                                    {column.title}
                                </h3>
                                <ul className="mt-4 space-y-2 text-sm">
                                    {column.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="transition-colors hover:text-white"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row">
                        <p>
                            Copyright © {new Date().getFullYear()} GroMedia A/S
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <Link href="/about" className="hover:text-white">
                                Terms &amp; Conditions
                            </Link>
                            <Link href="/about" className="hover:text-white">
                                Privacy Policy
                            </Link>
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="hover:text-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={register()}
                                    className="hover:text-white"
                                >
                                    Register
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
