"use client";

import { useState } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, MapPin, Zap, Droplets, Shield } from "lucide-react";
import { Badge } from '@/components/ui/badge';

import { useAppStore } from '@/store/useAppStore';

export default function MapPage() {
  const { incidents } = useAppStore();
  const [popupInfo, setPopupInfo] = useState<any>(null);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Community Map</h2>
        <p className="text-muted-foreground mt-1">
          Geospatial visualization of urban incidents and agent responses.
        </p>
      </div>

      <Card className="flex-1 bg-card border-border shadow-lg overflow-hidden flex flex-col relative">
        <CardContent className="p-0 flex-1 relative">
          {/* Map placeholder or actual map depending on token */}
          {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? (
            <div className="absolute inset-0 flex items-center justify-center bg-surface/50">
              <div className="text-center max-w-md p-6 bg-card border border-border rounded-xl shadow-2xl">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Mapbox Token Required</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Please add NEXT_PUBLIC_MAPBOX_TOKEN to your environment variables to enable the geospatial view.
                </p>
                <div className="bg-black/40 p-4 rounded-lg text-left text-xs font-mono text-muted-foreground break-all">
                  NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
                </div>
              </div>
            </div>
          ) : (
            <Map
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
              initialViewState={{
                longitude: -74.0060,
                latitude: 40.7128,
                zoom: 12
              }}
              mapStyle="mapbox://styles/mapbox/dark-v11"
              attributionControl={false}
            >
              <NavigationControl position="bottom-right" />
              
              {incidents.map((incident) => (
                <Marker
                  key={incident.id}
                  longitude={incident.longitude}
                  latitude={incident.latitude}
                  anchor="bottom"
                  onClick={e => {
                    e.originalEvent.stopPropagation();
                    setPopupInfo(incident);
                  }}
                >
                  <div className={`cursor-pointer w-6 h-6 rounded-full flex items-center justify-center animate-bounce shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
                    incident.severity === 'high' ? 'bg-danger text-white' : 
                    incident.severity === 'medium' ? 'bg-warning text-black' : 
                    'bg-secondary text-black'
                  }`}>
                    {incident.type === 'traffic' && <AlertTriangle className="w-3 h-3" />}
                    {incident.type === 'energy' && <Zap className="w-3 h-3" />}
                    {incident.type === 'water' && <Droplets className="w-3 h-3" />}
                  </div>
                </Marker>
              ))}

              {popupInfo && (
                <Popup
                  anchor="top"
                  longitude={popupInfo.longitude}
                  latitude={popupInfo.latitude}
                  onClose={() => setPopupInfo(null)}
                  className="urban-popup"
                  closeButton={false}
                >
                  <div className="bg-card border border-border p-3 rounded-lg shadow-xl max-w-[250px]">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={`text-[10px] uppercase border ${
                        popupInfo.severity === 'high' ? 'text-danger border-danger' : 
                        popupInfo.severity === 'medium' ? 'text-warning border-warning' : 
                        'text-secondary border-secondary'
                      }`}>
                        {popupInfo.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground uppercase">{popupInfo.type}</span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground mb-1">{popupInfo.title}</h4>
                    <p className="text-xs text-muted-foreground">{popupInfo.description}</p>
                  </div>
                </Popup>
              )}
            </Map>
          )}
        </CardContent>
        
        {/* Overlay Panel for mock map state or actual map */}
        <div className="absolute top-4 left-4 w-72 bg-card/90 backdrop-blur-md border border-border rounded-xl shadow-xl p-4 hidden md:block">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Active Incidents
          </h3>
          <div className="space-y-3">
            {incidents.map((incident) => (
              <div key={incident.id} className="bg-surface/50 border border-white/5 p-2 rounded-lg cursor-pointer hover:bg-surface transition-colors" onClick={() => setPopupInfo(incident)}>
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${
                    incident.severity === 'high' ? 'bg-danger shadow-[0_0_5px_rgba(255,92,117,0.8)]' : 
                    incident.severity === 'medium' ? 'bg-warning' : 'bg-secondary'
                  }`} />
                  <span className="text-xs font-semibold text-foreground">{incident.title}</span>
                </div>
                <p className="text-[10px] text-muted-foreground pl-4 line-clamp-1">{incident.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
