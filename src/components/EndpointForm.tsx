import React from 'react';
import { useForm } from 'react-hook-form';
import { Settings } from 'lucide-react';
import { ApiEndpoint } from '../types/config';

interface EndpointFormProps {
  onSubmit: (data: ApiEndpoint) => void;
}

export function EndpointForm({ onSubmit }: EndpointFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ApiEndpoint>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">URL</label>
        <input
          {...register('url', { required: true })}
          type="url"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.url && <span className="text-red-500">URL is required</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <input
          {...register('priority', { required: true, min: 1 })}
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.priority && <span className="text-red-500">Valid priority is required</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Field Mappings</label>
        <textarea
          {...register('fieldMappings', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="message: data.result"
        />
        {errors.fieldMappings && <span className="text-red-500">Field mappings are required</span>}
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Settings className="mr-2 h-4 w-4" />
        Add Endpoint
      </button>
    </form>
  );
}