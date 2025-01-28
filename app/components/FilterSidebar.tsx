"use client";

import React, { useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterSidebar({ facets }: { facets: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTimeout = useRef<NodeJS.Timeout>();

  const handleFilterChange = (key: string, value: string, shouldDebounce = false) => {
    if (shouldDebounce) {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      
      searchTimeout.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
        router.push(`/products?${params.toString()}`);
      }, 300);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/products?${params.toString()}`);
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-4 rounded shadow-sm">
      <div className="mb-4">
        <label className="block font-semibold text-gray-700 mb-1">
          Zoeken
        </label>
        <input
          type="text"
          placeholder="Zoek..."
          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          defaultValue={searchParams.get('q') || ''}
          onChange={(e) => handleFilterChange('q', e.target.value, true)}
        />
      </div>

      {facets.map((facet) => {
        // Check if this is part of a range (ends with From or To)
        const isRange = facet.key.endsWith('From') || facet.key.endsWith('To');
        const isFromField = facet.key.endsWith('From');
        
        // Skip 'To' fields as they'll be handled with their 'From' counterpart
        if (facet.key.endsWith('To')) return null;
        
        // Find matching 'To' field if this is a 'From' field
        const toField = isFromField 
          ? facets.find(f => f.key === facet.key.replace('From', 'To'))
          : null;

        return (
          <div key={facet.key} className="mb-4">
            <label className="block font-semibold text-gray-700 mb-1">
              {isRange ? facet.display.replace(' (vanaf)', '') : facet.display}
            </label>
            
            {isRange ? (
              <div className="flex gap-2">
                <div className="flex-1">
                  <select
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    defaultValue={searchParams.get(facet.key) || ''}
                    onChange={(e) => handleFilterChange(facet.key, e.target.value)}
                  >
                    <option value="">(Vanaf)</option>
                    {facet.options
                      .filter((opt: number) => {
                        const toValue = searchParams.get(toField?.key || '');
                        return !toValue || opt <= Number(toValue);
                      })
                      .map((opt: string | number) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="flex-1">
                  <select
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    defaultValue={searchParams.get(toField?.key || '') || ''}
                    onChange={(e) => handleFilterChange(toField?.key || '', e.target.value)}
                  >
                    <option value="">(Tot)</option>
                    {toField?.options
                      .filter((opt: number) => {
                        const fromValue = searchParams.get(facet.key);
                        return !fromValue || opt >= Number(fromValue);
                      })
                      .map((opt: string | number) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            ) : (
              <select 
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                defaultValue={searchParams.get(facet.key) || ''}
                onChange={(e) => handleFilterChange(facet.key, e.target.value)}
              >
                <option value="">(Alle)</option>
                {facet.options.map((opt: string | number) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}
          </div>
        );
      }).filter(Boolean)}
    </div>
  );
}