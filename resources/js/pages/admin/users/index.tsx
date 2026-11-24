import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    CheckCircle2,
    ShieldCheck,
    ShieldMinus,
    ShieldPlus,
    Trash2,
    Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { AdminUserListItem, Paginated } from '@/types';

type Props = {
    users: Paginated<AdminUserListItem>;
};

export default function UsersIndex({ users }: Props) {
    const { auth, flash } = usePage().props;

    const toggleAdmin = (user: AdminUserListItem) => {
        router.patch(
            `/admin/users/${user.id}`,
            { is_admin: !user.is_admin },
            { preserveScroll: true },
        );
    };

    const remove = (user: AdminUserListItem) => {
        if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) {
            return;
        }

        router.delete(`/admin/users/${user.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Users" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Users
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Promote trusted accounts to administrators or remove
                        accounts that are no longer needed.
                    </p>
                </div>

                {flash.success ? (
                    <div className="flex items-center gap-3 rounded-lg border border-emerald-600/20 bg-emerald-50 px-4 py-3 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
                        <CheckCircle2 className="size-4 shrink-0" aria-hidden />
                        <p className="text-sm font-medium">{flash.success}</p>
                    </div>
                ) : null}

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 text-left">
                                <tr>
                                    <th className="px-4 py-3 font-medium">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Email
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Role
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Verified
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Joined
                                    </th>
                                    <th className="px-4 py-3" />
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-12 text-center text-muted-foreground"
                                        >
                                            <Users
                                                className="mx-auto mb-2 size-5"
                                                aria-hidden
                                            />
                                            No users found.
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map((user) => {
                                        const isSelf =
                                            auth.user?.id === user.id;

                                        return (
                                            <tr
                                                key={user.id}
                                                className="border-t border-sidebar-border/70"
                                            >
                                                <td className="px-4 py-3 font-medium">
                                                    {user.name}
                                                    {isSelf ? (
                                                        <Badge
                                                            variant="outline"
                                                            className="ml-2"
                                                        >
                                                            You
                                                        </Badge>
                                                    ) : null}
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">
                                                    {user.email}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {user.is_admin ? (
                                                        <Badge className="gap-1">
                                                            <ShieldCheck
                                                                className="size-3"
                                                                aria-hidden
                                                            />
                                                            Admin
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary">
                                                            User
                                                        </Badge>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">
                                                    {user.email_verified_at
                                                        ? 'Yes'
                                                        : 'No'}
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">
                                                    {user.created_at}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            disabled={isSelf}
                                                            onClick={() =>
                                                                toggleAdmin(
                                                                    user,
                                                                )
                                                            }
                                                        >
                                                            {user.is_admin ? (
                                                                <>
                                                                    <ShieldMinus
                                                                        className="size-4"
                                                                        aria-hidden
                                                                    />
                                                                    Demote
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ShieldPlus
                                                                        className="size-4"
                                                                        aria-hidden
                                                                    />
                                                                    Promote
                                                                </>
                                                            )}
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            disabled={isSelf}
                                                            onClick={() =>
                                                                remove(user)
                                                            }
                                                        >
                                                            <Trash2
                                                                className="size-4"
                                                                aria-hidden
                                                            />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {users.links.length > 3 ? (
                    <div className="flex flex-wrap items-center gap-1">
                        {users.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`rounded-md border px-3 py-1.5 text-sm ${
                                        link.active
                                            ? 'border-transparent bg-primary text-primary-foreground'
                                            : 'border-sidebar-border/70 hover:bg-accent'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="rounded-md border border-sidebar-border/70 px-3 py-1.5 text-sm opacity-50"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ),
                        )}
                    </div>
                ) : null}
            </div>
        </>
    );
}

UsersIndex.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: '/admin/users',
        },
    ],
};
