import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Globe2, Leaf, Menu, Recycle, Sprout } from 'lucide-react';
import { useState } from 'react';
import { dashboard, login, register } from '@/routes';
import LocationMap, { type Location } from '@/components/location-map';

type Props = {
    locations: Location[];
};

const navLinks = [
    { label: 'About us', href: '#about' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Sustainability', href: '#sustainability' },
    { label: 'Find us', href: '#map' },
    { label: 'Contact', href: '#contact' },
];

export default function Welcome({ locations }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Growing responsibly, together" />

            <div className="min-h-screen scroll-smooth bg-[#faf8f3] font-sans text-stone-900">
                <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#12291b]/80 backdrop-blur-md">
                    <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 lg:px-8">
                        <a
                            href="#top"
                            className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white"
                        >
                            <Leaf
                                className="size-6 text-[#8fc17a]"
                                aria-hidden
                            />
                            GroMedia
                        </a>

                        <nav className="hidden items-center gap-8 md:flex">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-white/80 transition-colors hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                        <div className="hidden items-center gap-4 md:flex">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="text-sm text-white/80 transition-colors hover:text-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={login()}
                                    className="text-sm text-white/80 transition-colors hover:text-white"
                                >
                                    Log in
                                </Link>
                            )}
                            <a
                                href="#contact"
                                className="rounded-full bg-[#8fc17a] px-5 py-2 text-sm font-medium text-[#12291b] transition-colors hover:bg-[#a3d18f]"
                            >
                                Get in touch
                            </a>
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
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setMenuOpen(false)}
                                className="mt-2 rounded-full bg-[#8fc17a] px-5 py-2 text-center text-sm font-medium text-[#12291b]"
                            >
                                Get in touch
                            </a>
                        </nav>
                    ) : null}
                </header>

                <section
                    id="top"
                    className="relative flex min-h-screen items-center justify-center"
                >
                    <img
                        src="https://picsum.photos/seed/greenhouse/1920/1080"
                        alt="Seedlings growing in a greenhouse"
                        className="absolute inset-0 size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f14]/70 via-[#0d1f14]/50 to-[#0d1f14]/80" />

                    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
                        <p className="mb-5 text-sm font-medium tracking-[0.3em] text-[#8fc17a] uppercase">
                            Rooted in growing media since 1908
                        </p>
                        <h1 className="text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                            Growing
                            <br />
                            responsibly, together
                        </h1>
                        <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
                            Premium substrates, expert agronomy and sustainable
                            production for professional growers and home
                            gardeners around the world.
                        </p>
                        <div className="mt-9 flex flex-wrap justify-center gap-4">
                            <a
                                href="#solutions"
                                className="rounded-full bg-[#8fc17a] px-7 py-3 text-sm font-medium text-[#12291b] transition-colors hover:bg-[#a3d18f]"
                            >
                                Explore our solutions
                            </a>
                            <a
                                href="#map"
                                className="rounded-full border border-white/40 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                            >
                                Find us near you
                            </a>
                        </div>
                    </div>
                </section>

                <section
                    id="about"
                    className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28"
                >
                    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm">
                        <div className="overflow-hidden">
                            <img
                                src="https://picsum.photos/seed/seedling/1200/900"
                                alt="A seedling being handled with care"
                                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-8">
                            <h2 className="text-3xl font-semibold tracking-tight">
                                About us
                            </h2>
                            <p className="mt-3 text-stone-600">
                                We believe strong partnerships are the
                                foundation of success. Our customers are more
                                than customers, they are partners in growing.
                            </p>
                            <a
                                href="#sustainability"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#2f5d3a] hover:gap-3"
                            >
                                Read more
                                <ArrowRight className="size-4" aria-hidden />
                            </a>
                        </div>
                    </article>

                    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm">
                        <div className="overflow-hidden">
                            <img
                                src="https://picsum.photos/seed/hands/1200/900"
                                alt="Two hands holding soil"
                                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-8">
                            <h2 className="text-3xl font-semibold tracking-tight">
                                Get in touch
                            </h2>
                            <p className="mt-3 text-stone-600">
                                Contact us for expert advice, a custom substrate
                                solution or anything else. We are here to help
                                you grow.
                            </p>
                            <a
                                href="#contact"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#2f5d3a] hover:gap-3"
                            >
                                Reach out to us
                                <ArrowRight className="size-4" aria-hidden />
                            </a>
                        </div>
                    </article>
                </section>

                <section
                    id="sustainability"
                    className="bg-[#12291b] py-20 text-white lg:py-28"
                >
                    <div className="mx-auto max-w-7xl px-5 lg:px-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-semibold tracking-tight lg:text-5xl">
                                Better growing, lighter footprint
                            </h2>
                            <p className="mt-4 text-white/70">
                                From responsibly sourced raw materials to
                                renewable energy at our production sites, we
                                work to make every harvest a little greener.
                            </p>
                        </div>

                        <div className="mt-14 grid gap-8 sm:grid-cols-3">
                            {[
                                {
                                    icon: Globe2,
                                    value: '40+',
                                    label: 'Countries served',
                                    text: 'A global network of growers, partners and distributors.',
                                },
                                {
                                    icon: Sprout,
                                    value: '1908',
                                    label: 'Rooted since',
                                    text: 'More than a century of growing expertise.',
                                },
                                {
                                    icon: Recycle,
                                    value: '100%',
                                    label: 'Peat alternatives',
                                    text: 'Renewable raw materials across our range.',
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                                >
                                    <item.icon
                                        className="size-7 text-[#8fc17a]"
                                        aria-hidden
                                    />
                                    <p className="mt-5 text-4xl font-semibold tracking-tight">
                                        {item.value}
                                    </p>
                                    <p className="mt-1 font-medium text-[#8fc17a]">
                                        {item.label}
                                    </p>
                                    <p className="mt-3 text-sm text-white/70">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    id="map"
                    className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
                >
                    <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div className="max-w-2xl">
                            <p className="text-sm font-medium tracking-[0.25em] text-[#2f5d3a] uppercase">
                                Find us
                            </p>
                            <h2 className="mt-3 text-4xl font-semibold tracking-tight lg:text-5xl">
                                Where we grow
                            </h2>
                            <p className="mt-4 text-stone-600">
                                Our offices, production sites and support teams
                                span the continent. Select a location to explore
                                it on the map.
                            </p>
                        </div>
                        <p className="text-sm text-stone-500">
                            {locations.length} locations
                        </p>
                    </div>

                    <LocationMap locations={locations} />
                </section>

                <section id="contact" className="px-5 pb-20 lg:px-8 lg:pb-28">
                    <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#e8f0e3] px-8 py-14 lg:px-16 lg:py-20">
                        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                            <div>
                                <h2 className="text-4xl font-semibold tracking-tight lg:text-5xl">
                                    Stay updated
                                </h2>
                                <p className="mt-4 max-w-lg text-stone-700">
                                    Get the latest substrate innovations,
                                    growing techniques and industry insights
                                    delivered to your inbox. From product
                                    updates to seasonal advice, we help you
                                    achieve better results.
                                </p>
                            </div>
                            <form
                                className="flex flex-col gap-3 sm:flex-row"
                                onSubmit={(event) => event.preventDefault()}
                            >
                                <input
                                    type="email"
                                    required
                                    placeholder="you@company.com"
                                    className="w-full rounded-full border border-stone-300 bg-white px-5 py-3 text-sm outline-none focus:border-[#2f5d3a] focus:ring-2 focus:ring-[#2f5d3a]/20"
                                />
                                <button
                                    type="submit"
                                    className="shrink-0 rounded-full bg-[#2f5d3a] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[#244a2e]"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                <footer className="bg-[#12291b] px-5 py-16 text-white/70 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <p className="mb-12 max-w-3xl text-5xl leading-tight font-semibold tracking-tight text-white/15 lg:text-7xl">
                            Growing responsibly, together
                        </p>

                        <div className="grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    title: 'About us',
                                    links: ['Our story', 'Projects'],
                                },
                                {
                                    title: 'Job & career',
                                    links: ['Job openings', 'Why work here'],
                                },
                                {
                                    title: 'Downloads',
                                    links: ['Brochures', 'Sales conditions'],
                                },
                                {
                                    title: 'Contact us',
                                    links: [
                                        'Sales representatives',
                                        'Management',
                                    ],
                                },
                            ].map((column) => (
                                <div key={column.title}>
                                    <h3 className="font-medium text-white">
                                        {column.title}
                                    </h3>
                                    <ul className="mt-4 space-y-2 text-sm">
                                        {column.links.map((link) => (
                                            <li key={link}>
                                                <a
                                                    href="#top"
                                                    className="transition-colors hover:text-white"
                                                >
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row">
                            <p>
                                Copyright © {new Date().getFullYear()} GroMedia
                                A/S
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <a href="#top" className="hover:text-white">
                                    Terms &amp; Conditions
                                </a>
                                <a href="#top" className="hover:text-white">
                                    Privacy Policy
                                </a>
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
        </>
    );
}
