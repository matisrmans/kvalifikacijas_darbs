<?php

namespace Tests\Feature;

use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class JobApplicationTest extends TestCase
{
    use RefreshDatabase;

    public function test_application_form_can_be_rendered()
    {
        $this->get(route('careers.apply'))->assertOk();
    }

    public function test_a_candidate_can_submit_an_application()
    {
        Storage::fake('local');

        $response = $this->post(route('careers.store'), [
            'name' => 'Jane Grower',
            'email' => 'jane@example.com',
            'cv' => UploadedFile::fake()->create('jane-cv.pdf', 100, 'application/pdf'),
            'motivation' => 'I would love to join your team.',
        ]);

        $response->assertRedirect(route('careers.apply'));

        $this->assertDatabaseHas('job_applications', [
            'name' => 'Jane Grower',
            'email' => 'jane@example.com',
        ]);

        $application = JobApplication::firstOrFail();

        Storage::disk('local')->assertExists($application->cv_path);
    }

    public function test_an_application_requires_a_cv_and_motivation()
    {
        $response = $this->post(route('careers.store'), [
            'name' => 'Jane Grower',
            'email' => 'jane@example.com',
        ]);

        $response->assertSessionHasErrors(['cv', 'motivation']);
    }

    public function test_guests_cannot_access_the_admin_applications()
    {
        $this->get(route('admin.applications.index'))
            ->assertRedirect(route('login'));
    }

    public function test_non_admins_cannot_access_the_admin_applications()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('admin.applications.index'))
            ->assertForbidden();
    }

    public function test_admins_can_view_and_download_applications()
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
            ->get(route('admin.applications.index'))
            ->assertOk()
            ->assertSee('Jane Grower');

        $this->actingAs($admin)
            ->get(route('admin.applications.show', $application))
            ->assertOk()
            ->assertSee('I would love to join your team.');

        $this->actingAs($admin)
            ->get(route('admin.applications.download', $application))
            ->assertOk()
            ->assertDownload('jane-cv.pdf');
    }
}
