<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * List every registered user.
     */
    public function index(): Response
    {
        $users = User::query()
            ->orderByDesc('is_admin')
            ->orderBy('name')
            ->paginate(15)
            ->through(fn (User $user): array => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
                'email_verified_at' => $user->email_verified_at?->toDateTimeString(),
                'created_at' => $user->created_at?->toDateTimeString(),
            ]);

        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    /**
     * Promote or demote the given user.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'is_admin' => ['required', 'boolean'],
        ]);

        if ($user->is($request->user()) && ! $validated['is_admin']) {
            return back()->withErrors([
                'is_admin' => 'You cannot remove your own admin access.',
            ]);
        }

        $user->update(['is_admin' => $validated['is_admin']]);

        return back()->with(
            'success',
            $validated['is_admin']
                ? 'User promoted to administrator.'
                : 'Administrator access removed.',
        );
    }

    /**
     * Delete the given user.
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($user->is($request->user())) {
            return back()->withErrors([
                'user' => 'You cannot delete your own account here.',
            ]);
        }

        $user->delete();

        return back()->with('success', 'User deleted.');
    }
}
