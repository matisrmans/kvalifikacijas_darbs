import { Head } from '@inertiajs/react';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import SiteLayout from '@/layouts/site-layout';

const details = [
    {
        icon: MapPin,
        label: 'Visit us',
        value: 'GroMedia A/S, Growvej 12, 2800 Kgs. Lyngby, Denmark',
    },
    {
        icon: Mail,
        label: 'Email us',
        value: 'hello@gromedia.example',
    },
    {
        icon: Phone,
        label: 'Call us',
        value: '+45 45 00 00 00',
    },
    {
        icon: Clock,
        label: 'Opening hours',
        value: 'Monday – Friday, 08:00 – 16:00 CET',
    },
];

export default function Contact() {
    return (
        <>
            <Head title="Contact us" />

            <SiteLayout>
                <section className="bg-[#12291b] px-5 pt-32 pb-20 text-white lg:px-8 lg:pt-40">
                    <div className="mx-auto max-w-7xl">
                        <p className="text-sm font-medium tracking-[0.3em] text-[#8fc17a] uppercase">
                            Contact us
                        </p>
                        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                            Let's talk about growing
                        </h1>
                        <p className="mt-6 max-w-xl text-lg text-white/75">
                            Contact us for expert advice, a custom substrate
                            solution or anything else. Our team is here to help.
                        </p>
                    </div>
                </section>

                <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Contact details
                        </h2>
                        <div className="mt-8 grid gap-6 sm:grid-cols-2">
                            {details.map((detail) => (
                                <div
                                    key={detail.label}
                                    className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
                                >
                                    <detail.icon
                                        className="size-6 text-[#2f5d3a]"
                                        aria-hidden
                                    />
                                    <p className="mt-4 text-sm font-medium text-stone-500">
                                        {detail.label}
                                    </p>
                                    <p className="mt-1 text-stone-800">
                                        {detail.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm lg:p-10">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Send us a message
                        </h2>
                        <p className="mt-2 text-sm text-stone-600">
                            Fill in the form and we will get back to you within
                            one business day.
                        </p>

                        <form
                            className="mt-8 space-y-5"
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <label className="block">
                                    <span className="text-sm font-medium text-stone-700">
                                        Name
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Jane Grower"
                                        className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#2f5d3a] focus:ring-2 focus:ring-[#2f5d3a]/20"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-sm font-medium text-stone-700">
                                        Email
                                    </span>
                                    <input
                                        type="email"
                                        required
                                        placeholder="you@company.com"
                                        className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#2f5d3a] focus:ring-2 focus:ring-[#2f5d3a]/20"
                                    />
                                </label>
                            </div>
                            <label className="block">
                                <span className="text-sm font-medium text-stone-700">
                                    Subject
                                </span>
                                <input
                                    type="text"
                                    placeholder="How can we help?"
                                    className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#2f5d3a] focus:ring-2 focus:ring-[#2f5d3a]/20"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-stone-700">
                                    Message
                                </span>
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Tell us about your project..."
                                    className="mt-2 w-full resize-none rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#2f5d3a] focus:ring-2 focus:ring-[#2f5d3a]/20"
                                />
                            </label>
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 rounded-full bg-[#2f5d3a] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[#244a2e]"
                            >
                                Send message
                                <Send className="size-4" aria-hidden />
                            </button>
                        </form>
                    </div>
                </section>
            </SiteLayout>
        </>
    );
}
