<?php

namespace App\Http\Controllers;

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
            'locations' => $this->locations(),
        ]);
    }

    /**
     * The locations plotted on the homepage map.
     *
     * @return array<int, array{name: string, country: string, lat: float, lng: float, description: string}>
     */
    protected function locations(): array
    {
        return [
            [
                'name' => 'Kobenhavn',
                'country' => 'Denmark',
                'lat' => 55.6761,
                'lng' => 12.5683,
                'description' => 'Group headquarters and central research facilities.',
            ],
            [
                'name' => 'Riga',
                'country' => 'Latvia',
                'lat' => 56.9496,
                'lng' => 24.1052,
                'description' => 'Regional office serving the Baltic growers.',
            ],
            [
                'name' => 'Hamburg',
                'country' => 'Germany',
                'lat' => 53.5511,
                'lng' => 9.9937,
                'description' => 'Distribution hub for central and western Europe.',
            ],
            [
                'name' => 'Amsterdam',
                'country' => 'Netherlands',
                'lat' => 52.3676,
                'lng' => 4.9041,
                'description' => 'Sales and agronomy support for horticulture partners.',
            ],
            [
                'name' => 'Warsaw',
                'country' => 'Poland',
                'lat' => 52.2297,
                'lng' => 21.0122,
                'description' => 'Production site for professional growing media.',
            ],
            [
                'name' => 'Vilnius',
                'country' => 'Lithuania',
                'lat' => 54.6872,
                'lng' => 25.2797,
                'description' => 'Logistics and customer service for the Baltic region.',
            ],
            [
                'name' => 'Lyon',
                'country' => 'France',
                'lat' => 45.7640,
                'lng' => 4.8357,
                'description' => 'Technical centre for vine and nursery substrates.',
            ],
            [
                'name' => 'Valencia',
                'country' => 'Spain',
                'lat' => 39.4699,
                'lng' => -0.3763,
                'description' => 'Southern European warehouse and trials garden.',
            ],
        ];
    }
}
