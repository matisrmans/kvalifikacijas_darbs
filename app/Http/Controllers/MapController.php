<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Inertia\Inertia;
use Inertia\Response;

class MapController extends Controller
{
    /**
     * Render the homepage with the company location map.
     */
    public function index(): Response
    {
        return Inertia::render('welcome', [
            'locations' => Location::query()
                ->orderBy('name')
                ->get(['name', 'country', 'lat', 'lng', 'description']),
        ]);
    }
}
