'use client';

import React from 'react';
import { Mic, RefreshCw } from 'lucide-react';
import { useAudioDevices } from '@/hooks/useAudioDevices';

interface MicrophoneDeviceSelectorProps {
  selectedDeviceId: string;
  onDeviceSelect: (deviceId: string) => void;
}

export default function MicrophoneDeviceSelector({
  selectedDeviceId,
  onDeviceSelect
}: MicrophoneDeviceSelectorProps) {
  const { devices, refreshDevices } = useAudioDevices();

  return (
    <div className="space-y-1.5 text-xs">
      <div className="flex items-center justify-between text-slate-300">
        <label className="font-semibold flex items-center gap-1.5">
          <Mic className="w-3.5 h-3.5 text-indigo-400" /> Perangkat Mikrofon Input:
        </label>
        <button
          type="button"
          onClick={refreshDevices}
          className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
        >
          <RefreshCw className="w-3 h-3" /> Refresh Perangkat
        </button>
      </div>

      <select
        value={selectedDeviceId}
        onChange={(e) => onDeviceSelect(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
      >
        {devices.length === 0 ? (
          <option value="">Mikrofon Default Sistem</option>
        ) : (
          devices.map((d) => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
