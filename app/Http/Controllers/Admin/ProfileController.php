<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProfileRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the logged-in administrator's profile.
     */
    public function edit(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        return Inertia::render('admin/profile', [
            'profile' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'job_title' => $user->job_title,
                'phone' => $user->phone,
                'bio' => $user->bio,
                'avatar' => $user->avatar,
                'email_verified_at' => $user->email_verified_at?->toDateTimeString(),
            ],
        ]);
    }

    /**
     * Update the logged-in administrator's profile.
     */
    public function update(ProfileRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $validated = $request->safe()->except(['avatar', 'remove_avatar']);

        if ($request->boolean('remove_avatar') && $user->avatar_path) {
            Storage::disk('public')->delete($user->avatar_path);
            $validated['avatar_path'] = null;
        }

        if ($request->hasFile('avatar')) {
            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }

            $validated['avatar_path'] = $request->file('avatar')->store('avatars', 'public');
        }

        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Profile updated.')]);

        return to_route('admin.profile.edit');
    }
}
