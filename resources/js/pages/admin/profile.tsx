import { Head, useForm, usePage } from '@inertiajs/react';
import { Camera, CheckCircle2, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInitials } from '@/hooks/use-initials';

type Profile = {
    id: number;
    name: string;
    email: string;
    job_title: string | null;
    phone: string | null;
    bio: string | null;
    avatar: string | null;
    email_verified_at: string | null;
};

type Props = {
    profile: Profile;
};

export default function AdminProfile({ profile }: Props) {
    const { flash } = usePage().props;
    const getInitials = useInitials();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<{
        name: string;
        email: string;
        job_title: string;
        phone: string;
        bio: string;
        avatar: File | null;
        remove_avatar: boolean;
    }>({
        name: profile.name,
        email: profile.email,
        job_title: profile.job_title ?? '',
        phone: profile.phone ?? '',
        bio: profile.bio ?? '',
        avatar: null,
        remove_avatar: false,
    });

    const [preview, setPreview] = useState<string | null>(profile.avatar);

    useEffect(() => {
        if (!form.data.avatar) {
            setPreview(profile.avatar);
            return;
        }

        const url = URL.createObjectURL(form.data.avatar);
        setPreview(url);

        return () => URL.revokeObjectURL(url);
    }, [form.data.avatar, profile.avatar]);

    const visibleAvatar = form.data.remove_avatar ? null : preview;

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        form.patch('/admin/profile', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                form.setData('avatar', null);
                form.setData('remove_avatar', false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        form.setData('avatar', file);
        if (file) {
            form.setData('remove_avatar', false);
        }
    };

    return (
        <>
            <Head title="Admin profile" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Admin profile
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Update your personal details, contact information and
                        public profile shown across the admin panel.
                    </p>
                </div>

                {flash.success ? (
                    <div className="flex items-center gap-3 rounded-lg border border-emerald-600/20 bg-emerald-50 px-4 py-3 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
                        <CheckCircle2 className="size-4 shrink-0" aria-hidden />
                        <p className="text-sm font-medium">{flash.success}</p>
                    </div>
                ) : null}

                <form
                    onSubmit={submit}
                    className="grid gap-6 lg:grid-cols-[320px_1fr]"
                >
                    <aside className="flex h-fit flex-col items-center gap-4 rounded-xl border border-sidebar-border/70 p-6 text-center">
                        <Avatar className="size-28">
                            {visibleAvatar ? (
                                <AvatarImage
                                    src={visibleAvatar}
                                    alt={profile.name}
                                />
                            ) : null}
                            <AvatarFallback className="text-2xl">
                                {getInitials(profile.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-lg font-semibold">
                                {profile.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {profile.email}
                            </p>
                            {profile.job_title ? (
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {profile.job_title}
                                </p>
                            ) : (
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Administrator
                                </p>
                            )}
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Camera className="size-4" aria-hidden />
                                Upload avatar
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={onFileChange}
                            />
                            {profile.avatar || form.data.avatar ? (
                                <label className="flex items-center justify-center gap-2 text-sm">
                                    <Checkbox
                                        checked={form.data.remove_avatar}
                                        onCheckedChange={(checked) =>
                                            form.setData(
                                                'remove_avatar',
                                                checked === true,
                                            )
                                        }
                                    />
                                    Remove current avatar
                                </label>
                            ) : null}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            JPG, PNG or WebP up to 2MB.
                        </p>
                        <InputError message={form.errors.avatar} />
                    </aside>

                    <section className="space-y-6 rounded-xl border border-sidebar-border/70 p-6">
                        <div>
                            <h2 className="text-lg font-semibold tracking-tight">
                                Account details
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Basic information used for login and display.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full name</Label>
                                <Input
                                    id="name"
                                    value={form.data.name}
                                    onChange={(event) =>
                                        form.setData('name', event.target.value)
                                    }
                                    required
                                />
                                <InputError message={form.errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={form.data.email}
                                    onChange={(event) =>
                                        form.setData(
                                            'email',
                                            event.target.value,
                                        )
                                    }
                                    required
                                />
                                <InputError message={form.errors.email} />
                            </div>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="job_title">Job title</Label>
                                <Input
                                    id="job_title"
                                    value={form.data.job_title}
                                    onChange={(event) =>
                                        form.setData(
                                            'job_title',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="e.g. Operations Manager"
                                />
                                <InputError message={form.errors.job_title} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone number</Label>
                                <Input
                                    id="phone"
                                    value={form.data.phone}
                                    onChange={(event) =>
                                        form.setData(
                                            'phone',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="+1234567890"
                                />
                                <InputError message={form.errors.phone} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="bio">Bio</Label>
                            <textarea
                                id="bio"
                                value={form.data.bio}
                                onChange={(event) =>
                                    form.setData('bio', event.target.value)
                                }
                                rows={5}
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                placeholder="Tell us a bit about yourself and your role..."
                            />
                            <InputError message={form.errors.bio} />
                        </div>

                        <div className="flex items-center gap-3">
                            <Button type="submit" disabled={form.processing}>
                                <UserRound className="size-4" aria-hidden />
                                Save profile
                            </Button>
                        </div>
                    </section>
                </form>
            </div>
        </>
    );
}

AdminProfile.layout = {
    breadcrumbs: [
        {
            title: 'Admin profile',
            href: '/admin/profile',
        },
    ],
};
