import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    HeartHandshake,
    Leaf,
    Recycle,
    Sprout,
} from 'lucide-react';
import SiteLayout from '@/layouts/site-layout';

const values = [
    {
        icon: Sprout,
        title: 'Growing expertise',
        text: 'More than a century of hands-on knowledge in substrates, nutrition and plant health.',
    },
    {
        icon: Recycle,
        title: 'Responsible materials',
        text: 'We continually expand our use of renewable and recycled raw materials.',
    },
    {
        icon: HeartHandshake,
        title: 'True partnership',
        text: 'We work side by side with growers to solve real problems in the greenhouse.',
    },
];

export default function About() {
    return (
        <>
            <Head title="About us" />

            <SiteLayout>
                <section className="relative flex min-h-[60vh] items-center justify-center pt-16">
                    <img
                        src="https://picsum.photos/seed/fields/1920/1080"
                        alt="Rows of young plants"
                        className="absolute inset-0 size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f14]/70 to-[#0d1f14]/80" />
                    <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center text-white">
                        <p className="mb-4 text-sm font-medium tracking-[0.3em] text-[#8fc17a] uppercase">
                            About us
                        </p>
                        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                            Growing a responsible world
                        </h1>
                        <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
                            For generations we have helped growers around the
                            world turn the right growing media into healthier,
                            stronger plants.
                        </p>
                    </div>
                </section>

                <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
                    <div>
                        <p className="text-sm font-medium tracking-[0.25em] text-[#2f5d3a] uppercase">
                            Our story
                        </p>
                        <h2 className="mt-3 text-4xl font-semibold tracking-tight lg:text-5xl">
                            Rooted since 1908
                        </h2>
                        <p className="mt-5 text-stone-600">
                            What began as a small family operation has grown
                            into a global partner for professional growers and
                            home gardeners. Along the way our purpose has stayed
                            the same: make growing easier, more reliable and
                            more responsible.
                        </p>
                        <p className="mt-4 text-stone-600">
                            Today we combine agronomic research with modern
                            production to deliver consistent substrates that
                            perform season after season, wherever you grow.
                        </p>
                    </div>
                    <div className="overflow-hidden rounded-3xl">
                        <img
                            src="https://picsum.photos/seed/story/1200/900"
                            alt="A grower inspecting plants"
                            className="aspect-[4/3] w-full object-cover"
                        />
                    </div>
                </section>

                <section className="bg-[#12291b] py-20 text-white lg:py-28">
                    <div className="mx-auto max-w-7xl px-5 lg:px-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-semibold tracking-tight lg:text-5xl">
                                What we stand for
                            </h2>
                            <p className="mt-4 text-white/70">
                                Three ideas guide every decision we make, from
                                the raw materials we choose to the partners we
                                work with.
                            </p>
                        </div>

                        <div className="mt-14 grid gap-8 sm:grid-cols-3">
                            {values.map((value) => (
                                <div
                                    key={value.title}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                                >
                                    <value.icon
                                        className="size-7 text-[#8fc17a]"
                                        aria-hidden
                                    />
                                    <h3 className="mt-5 text-xl font-semibold">
                                        {value.title}
                                    </h3>
                                    <p className="mt-3 text-sm text-white/70">
                                        {value.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
                    <div className="grid gap-8 rounded-3xl bg-[#e8f0e3] p-8 sm:grid-cols-3 lg:p-16">
                        {[
                            { value: '1908', label: 'Founded' },
                            { value: '40+', label: 'Countries served' },
                            { value: '100%', label: 'Peat alternatives' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-5xl font-semibold tracking-tight text-[#2f5d3a]">
                                    {stat.value}
                                </p>
                                <p className="mt-2 text-stone-600">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="px-5 pb-20 lg:px-8 lg:pb-28">
                    <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:p-12">
                        <div className="flex items-center gap-4">
                            <Leaf
                                className="size-8 text-[#2f5d3a]"
                                aria-hidden
                            />
                            <div>
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Ready to grow with us?
                                </h2>
                                <p className="mt-1 text-stone-600">
                                    Talk to our team about the right solution
                                    for your crop.
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/contact"
                            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#2f5d3a] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[#244a2e]"
                        >
                            Get in touch
                            <ArrowRight className="size-4" aria-hidden />
                        </Link>
                    </div>
                </section>
            </SiteLayout>
        </>
    );
}
