<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Seed the company locations shown on the homepage map.
     */
    public function run(): void
    {
        $locations = [
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

        foreach ($locations as $location) {
            Location::query()->updateOrCreate(
                ['name' => $location['name']],
                $location,
            );
        }
    }
}
