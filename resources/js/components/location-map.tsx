import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export type Location = {
    name: string;
    country: string;
    lat: number;
    lng: number;
    description: string;
};

type Props = {
    locations: Location[];
};

const ACCENT = '#2f5d3a';

export default function LocationMap({ locations }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<Map<string, L.CircleMarker>>(new Map());
    const [active, setActive] = useState<string | null>(
        locations[0]?.name ?? null,
    );

    useEffect(() => {
        if (!containerRef.current || mapRef.current) {
            return;
        }

        const map = L.map(containerRef.current, {
            scrollWheelZoom: false,
            zoomControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const markers = new Map<string, L.CircleMarker>();
        const bounds: L.LatLng[] = [];

        locations.forEach((location) => {
            const point: L.LatLngTuple = [location.lat, location.lng];
            bounds.push(L.latLng(point));

            const marker = L.circleMarker(point, {
                radius: 9,
                color: '#ffffff',
                weight: 3,
                fillColor: ACCENT,
                fillOpacity: 1,
            })
                .addTo(map)
                .bindPopup(
                    `<strong>${location.name}</strong><br/>${location.country}<br/><span style="color:#555">${location.description}</span>`,
                );

            markers.set(location.name, marker);
        });

        map.fitBounds(L.latLngBounds(bounds).pad(0.25));

        mapRef.current = map;
        markersRef.current = markers;

        return () => {
            map.remove();
            mapRef.current = null;
            markersRef.current = new Map();
        };
    }, [locations]);

    const focus = (location: Location) => {
        setActive(location.name);
        const marker = markersRef.current.get(location.name);
        if (marker && mapRef.current) {
            mapRef.current.flyTo([location.lat, location.lng], 7, {
                duration: 0.8,
            });
            marker.openPopup();
        }
    };

    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
            <div className="flex max-h-[460px] flex-col gap-2 overflow-y-auto pr-1">
                {locations.map((location) => {
                    const isActive = active === location.name;
                    return (
                        <button
                            key={location.name}
                            type="button"
                            onClick={() => focus(location)}
                            className={`rounded-xl border p-4 text-left transition-colors ${
                                isActive
                                    ? 'border-[#2f5d3a] bg-[#f1f6ef]'
                                    : 'border-stone-200 bg-white hover:border-[#2f5d3a]/40 hover:bg-stone-50'
                            }`}
                        >
                            <span className="flex items-center gap-2 font-medium text-stone-900">
                                <MapPin
                                    className="size-4 shrink-0 text-[#2f5d3a]"
                                    aria-hidden
                                />
                                {location.name}
                                <span className="text-sm font-normal text-stone-500">
                                    {location.country}
                                </span>
                            </span>
                            <span className="mt-1 block text-sm text-stone-600">
                                {location.description}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div
                ref={containerRef}
                className="h-[460px] w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100"
                role="img"
                aria-label="Map of company locations"
            />
        </div>
    );
}
