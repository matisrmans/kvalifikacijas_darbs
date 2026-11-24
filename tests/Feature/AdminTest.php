<?php

namespace Tests\Feature;

use App\Models\JobApplication;
use App\Models\Location;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_admins_can_view_the_admin_dashboard()
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('admin.dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/dashboard')
                ->has('stats')
                ->has('recentApplications'));
    }

    public function test_non_admins_cannot_view_the_admin_dashboard()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('admin.dashboard'))
            ->assertForbidden();
    }

    public function test_the_homepage_shows_locations_from_the_database()
    {
        Location::query()->create([
            'name' => 'Riga',
            'country' => 'Latvia',
            'lat' => 56.9496,
            'lng' => 24.1052,
            'description' => 'Regional office.',
        ]);

        $this->get(route('home'))
            ->assertOk()
            ->assertSee('Riga');
    }

    public function test_admins_can_create_update_and_delete_locations()
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.locations.store'), [
                'name' => 'Oslo',
                'country' => 'Norway',
                'lat' => 59.9139,
                'lng' => 10.7522,
                'description' => 'Nordic sales office.',
            ])
            ->assertRedirect(route('admin.locations.index'));

        $this->assertDatabaseHas('locations', ['name' => 'Oslo']);

        $location = Location::query()->where('name', 'Oslo')->firstOrFail();

        $this->actingAs($admin)
            ->put(route('admin.locations.update', $location), [
                'name' => 'Oslo HQ',
                'country' => 'Norway',
                'lat' => 59.9139,
                'lng' => 10.7522,
                'description' => 'Nordic headquarters.',
            ])
            ->assertRedirect(route('admin.locations.index'));

        $this->assertDatabaseHas('locations', ['name' => 'Oslo HQ']);

        $this->actingAs($admin)
            ->delete(route('admin.locations.destroy', $location))
            ->assertRedirect(route('admin.locations.index'));

        $this->assertDatabaseMissing('locations', ['id' => $location->id]);
    }

    public function test_locations_are_validated()
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.locations.store'), [
                'name' => '',
                'country' => '',
                'lat' => 100,
                'lng' => 200,
                'description' => '',
            ])
            ->assertSessionHasErrors(['name', 'country', 'lat', 'lng', 'description']);
    }

    public function test_admins_can_promote_and_demote_users()
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->create();

        $this->actingAs($admin)
            ->patch(route('admin.users.update', $user), ['is_admin' => true])
            ->assertRedirect();

        $this->assertTrue($user->fresh()->is_admin);

        $this->actingAs($admin)
            ->patch(route('admin.users.update', $user), ['is_admin' => false])
            ->assertRedirect();

        $this->assertFalse($user->fresh()->is_admin);
    }

    public function test_admins_cannot_demote_or_delete_themselves()
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->patch(route('admin.users.update', $admin), ['is_admin' => false])
            ->assertSessionHasErrors('is_admin');

        $this->assertTrue($admin->fresh()->is_admin);

        $this->actingAs($admin)
            ->delete(route('admin.users.destroy', $admin))
            ->assertSessionHasErrors('user');

        $this->assertDatabaseHas('users', ['id' => $admin->id]);
    }

    public function test_admins_can_delete_other_users()
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->create();

        $this->actingAs($admin)
            ->delete(route('admin.users.destroy', $user))
            ->assertRedirect();

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_admins_can_delete_an_application_and_its_cv()
    {
        Storage::fake('local');

        $admin = User::factory()->admin()->create();

        $this->post(route('careers.store'), [
            'name' => 'Jane Grower',
            'email' => 'jane@example.com',
            'cv' => UploadedFile::fake()->create('jane-cv.pdf', 100, 'application/pdf'),
            'motivation' => 'I would love to join your team.',
        ]);

        $application = JobApplication::firstOrFail();

        $this->actingAs($admin)
            ->delete(route('admin.applications.destroy', $application))
            ->assertRedirect(route('admin.applications.index'));

        $this->assertDatabaseMissing('job_applications', ['id' => $application->id]);
        Storage::disk('local')->assertMissing($application->cv_path);
    }

    public function test_admins_can_view_their_profile()
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('admin.profile.edit'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/profile')
                ->where('profile.email', $admin->email));
    }

    public function test_non_admins_cannot_view_the_admin_profile()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('admin.profile.edit'))
            ->assertForbidden();
    }

    public function test_admins_can_update_their_profile_with_an_avatar()
    {
        Storage::fake('public');

        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->patch(route('admin.profile.update'), [
                'name' => 'Updated Admin',
                'email' => 'updated@example.com',
                'job_title' => 'Operations Lead',
                'phone' => '+1234567890',
                'bio' => 'I keep the growing operations running.',
                'avatar' => UploadedFile::fake()->image('avatar.jpg', 200, 200),
            ])
            ->assertRedirect(route('admin.profile.edit'));

        $admin->refresh();

        $this->assertSame('Updated Admin', $admin->name);
        $this->assertSame('updated@example.com', $admin->email);
        $this->assertSame('Operations Lead', $admin->job_title);
        $this->assertSame('+1234567890', $admin->phone);
        $this->assertSame('I keep the growing operations running.', $admin->bio);
        $this->assertNull($admin->email_verified_at);
        $this->assertNotNull($admin->avatar_path);
        Storage::disk('public')->assertExists($admin->avatar_path);
    }

    public function test_admins_can_remove_their_profile_avatar()
    {
        Storage::fake('public');

        $admin = User::factory()->admin()->create([
            'avatar_path' => 'avatars/old-avatar.jpg',
        ]);

        Storage::disk('public')->put($admin->avatar_path, 'avatar');

        $this->actingAs($admin)
            ->patch(route('admin.profile.update'), [
                'name' => $admin->name,
                'email' => $admin->email,
                'remove_avatar' => true,
            ])
            ->assertRedirect(route('admin.profile.edit'));

        $admin->refresh();

        $this->assertNull($admin->avatar_path);
        Storage::disk('public')->assertMissing('avatars/old-avatar.jpg');
    }
}
