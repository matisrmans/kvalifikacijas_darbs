import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AdminLocation } from '@/types';

type Props = {
    location: AdminLocation | null;
};

export default function LocationForm({ location }: Props) {
    const isEditing = Boolean(location);

    const form = useForm({
        name: location?.name ?? '',
        country: location?.country ?? '',
        lat: location?.lat?.toString() ?? '',
        lng: location?.lng?.toString() ?? '',
        description: location?.description ?? '',
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        if (isEditing && location) {
            form.put(`/admin/locations/${location.id}`, {
                preserveScroll: true,
            });
            return;
        }

        form.post('/admin/locations', {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={isEditing ? 'Edit location' : 'Add location'} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <Button asChild variant="ghost" size="sm" className="-ml-2">
                        <Link href="/admin/locations">
                            <ArrowLeft className="size-4" aria-hidden />
                            Back to locations
                        </Link>
                    </Button>
                </div>

                <div className="mx-auto w-full max-w-2xl">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {isEditing ? 'Edit location' : 'Add location'}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {isEditing
                                ? 'Update the coordinates and details shown on the map.'
                                : 'Add a new office or site to the homepage map.'}
                        </p>
                    </div>

                    <form
                        onSubmit={submit}
                        className="space-y-6 rounded-xl border border-sidebar-border/70 p-6"
                    >
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Location name</Label>
                                <Input
                                    id="name"
                                    value={form.data.name}
                                    onChange={(event) =>
                                        form.setData('name', event.target.value)
                                    }
                                    placeholder="Copenhagen"
                                    required
                                />
                                <InputError message={form.errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    id="country"
                                    value={form.data.country}
                                    onChange={(event) =>
                                        form.setData(
                                            'country',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Denmark"
                                    required
                                />
                                <InputError message={form.errors.country} />
                            </div>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="lat">Latitude</Label>
                                <Input
                                    id="lat"
                                    type="number"
                                    step="0.0000001"
                                    value={form.data.lat}
                                    onChange={(event) =>
                                        form.setData('lat', event.target.value)
                                    }
                                    placeholder="55.6761"
                                    required
                                />
                                <InputError message={form.errors.lat} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lng">Longitude</Label>
                                <Input
                                    id="lng"
                                    type="number"
                                    step="0.0000001"
                                    value={form.data.lng}
                                    onChange={(event) =>
                                        form.setData('lng', event.target.value)
                                    }
                                    placeholder="12.5683"
                                    required
                                />
                                <InputError message={form.errors.lng} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                value={form.data.description}
                                onChange={(event) =>
                                    form.setData(
                                        'description',
                                        event.target.value,
                                    )
                                }
                                rows={4}
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                placeholder="What happens at this location..."
                                required
                            />
                            <InputError message={form.errors.description} />
                        </div>

                        <div className="flex items-center gap-3">
                            <Button type="submit" disabled={form.processing}>
                                <Save className="size-4" aria-hidden />
                                {isEditing ? 'Save changes' : 'Create location'}
                            </Button>
                            <Button asChild variant="ghost">
                                <Link href="/admin/locations">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

LocationForm.layout = {
    breadcrumbs: [
        {
            title: 'Locations',
            href: '/admin/locations',
        },
        {
            title: 'Location details',
            href: '/admin/locations',
        },
    ],
};
