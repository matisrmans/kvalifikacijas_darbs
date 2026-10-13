<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MapController extends Controller
{
    public function index()
    {
        $locations = [
            [
                'name' => 'Riga',
                'lat' => 56.9496,
                'lng' => 24.1052,
                'description' => 'Latvijas galvaspilsēta'
            ],
            [
                'name' => 'Liepāja',
                'lat' => 56.5047,
                'lng' => 21.0108,
                'description' => 'Coastal city on the Baltic shore.'
            ],
            [
                'name' => 'Daugavpils',
                'lat' => 55.8714,
                'lng' => 26.5161,
                'description' => 'Second largest city in Latvia.'
            ]
        ];
        return view('map', compact('locations'));
    }
}
