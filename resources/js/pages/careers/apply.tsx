import { Head, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, FileText, Send, Upload } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SiteLayout from '@/layouts/site-layout';

export default function Apply() {
    const { flash } = usePage().props;

    const form = useForm<{
        name: string;
        email: string;
        cv: File | null;
        motivation: string;
    }>({
        name: '',
        email: '',
        cv: null,
        motivation: '',
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        form.post('/careers/apply', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    return (
        <>
            <Head title="Job application" />

            <SiteLayout>
                <section className="bg-[#12291b] px-5 pt-32 pb-20 text-white lg:px-8 lg:pt-40">
                    <div className="mx-auto max-w-7xl">
                        <p className="text-sm font-medium tracking-[0.3em] text-[#8fc17a] uppercase">
                            Careers
                        </p>
                        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                            Grow your career with us
                        </h1>
                        <p className="mt-6 max-w-xl text-lg text-white/75">
                            Send us your CV and a short motivational letter. Our
                            team reviews every application and will get back to
                            you.
                        </p>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-3xl px-5 py-20 lg:px-8 lg:py-28">
                    {flash.success ? (
                        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-[#2f5d3a]/20 bg-[#e8f0e3] px-5 py-4 text-[#2f5d3a]">
                            <CheckCircle2
                                className="size-5 shrink-0"
                                aria-hidden
                            />
                            <p className="text-sm font-medium">
                                {flash.success}
                            </p>
                        </div>
                    ) : null}

                    <form
                        onSubmit={submit}
                        className="space-y-6 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm lg:p-10"
                    >
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={form.data.name}
                                    onChange={(event) =>
                                        form.setData('name', event.target.value)
                                    }
                                    placeholder="Jane Grower"
                                    required
                                />
                                <InputError message={form.errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={form.data.email}
                                    onChange={(event) =>
                                        form.setData(
                                            'email',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="you@company.com"
                                    required
                                />
                                <InputError message={form.errors.email} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="cv">CV</Label>
                            <label
                                htmlFor="cv"
                                className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-5 py-6 transition-colors hover:border-[#2f5d3a]/50 hover:bg-stone-100"
                            >
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-[#2f5d3a] shadow-sm">
                                    {form.data.cv ? (
                                        <FileText
                                            className="size-5"
                                            aria-hidden
                                        />
                                    ) : (
                                        <Upload
                                            className="size-5"
                                            aria-hidden
                                        />
                                    )}
                                </span>
                                <span className="text-sm">
                                    <span className="block font-medium text-stone-800">
                                        {form.data.cv
                                            ? form.data.cv.name
                                            : 'Upload your CV'}
                                    </span>
                                    <span className="text-stone-500">
                                        PDF, DOC or DOCX, up to 5 MB
                                    </span>
                                </span>
                            </label>
                            <input
                                id="cv"
                                name="cv"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="sr-only"
                                onChange={(event) =>
                                    form.setData(
                                        'cv',
                                        event.target.files?.[0] ?? null,
                                    )
                                }
                            />
                            <InputError message={form.errors.cv} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="motivation">
                                Motivational letter
                            </Label>
                            <textarea
                                id="motivation"
                                name="motivation"
                                rows={7}
                                value={form.data.motivation}
                                onChange={(event) =>
                                    form.setData(
                                        'motivation',
                                        event.target.value,
                                    )
                                }
                                placeholder="Tell us why you would like to join our team..."
                                required
                                className="w-full resize-none rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#2f5d3a] focus:ring-2 focus:ring-[#2f5d3a]/20"
                            />
                            <InputError message={form.errors.motivation} />
                        </div>

                        <Button
                            type="submit"
                            disabled={form.processing}
                            className="w-full bg-[#2f5d3a] text-white hover:bg-[#244a2e] sm:w-auto"
                        >
                            <Send className="size-4" aria-hidden />
                            {form.processing
                                ? 'Sending...'
                                : 'Send application'}
                        </Button>
                    </form>
                </section>
            </SiteLayout>
        </>
    );
}
