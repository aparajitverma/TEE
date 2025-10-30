import { Award, X } from 'lucide-react';
import { useState } from 'react';

interface CertificationsStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const AVAILABLE_CERTIFICATIONS = [
  'USDA Organic',
  'India Organic',
  'ISO 22000',
  'ISO 9001',
  'Halal',
  'Kosher',
  'GMP',
  'HACCP',
  'Fair Trade',
  'Rainforest Alliance',
];

export default function CertificationsStep({ formData, updateFormData }: CertificationsStepProps) {
  const [customCert, setCustomCert] = useState('');

  const toggleCertification = (cert: string) => {
    const current = formData.certifications || [];
    if (current.includes(cert)) {
      updateFormData({ certifications: current.filter((c: string) => c !== cert) });
    } else {
      updateFormData({ certifications: [...current, cert] });
    }
  };

  const addCustomCertification = () => {
    if (customCert.trim() && !formData.certifications.includes(customCert.trim())) {
      updateFormData({ certifications: [...formData.certifications, customCert.trim()] });
      setCustomCert('');
    }
  };

  const removeCertification = (cert: string) => {
    updateFormData({ certifications: formData.certifications.filter((c: string) => c !== cert) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
          <Award className="w-5 h-5 text-yellow-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Certifications & Compliance</h2>
          <p className="text-sm text-gray-400">Quality certifications and regulatory compliance</p>
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-3">Select Certifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {AVAILABLE_CERTIFICATIONS.map((cert) => (
            <button
              key={cert}
              type="button"
              onClick={() => toggleCertification(cert)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                formData.certifications.includes(cert)
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-600'
              }`}
            >
              {cert}
            </button>
          ))}
        </div>

        {/* Custom Certification */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Add Custom Certification
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customCert}
              onChange={(e) => setCustomCert(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomCertification()}
              className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              placeholder="Enter certification name"
            />
            <button
              type="button"
              onClick={addCustomCertification}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Add
            </button>
          </div>
        </div>

        {/* Selected Certifications */}
        {formData.certifications.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Selected Certifications:</p>
            <div className="flex flex-wrap gap-2">
              {formData.certifications.map((cert: string) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded-full text-sm text-emerald-400"
                >
                  {cert}
                  <button
                    type="button"
                    onClick={() => removeCertification(cert)}
                    className="hover:text-emerald-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Compliance Codes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            HS Code
          </label>
          <input
            type="text"
            value={formData.hsCode}
            onChange={(e) => updateFormData({ hsCode: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., 0910.30"
          />
          <p className="text-xs text-gray-500 mt-1">Harmonized System code for customs</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            CAS Number
          </label>
          <input
            type="text"
            value={formData.casNumber}
            onChange={(e) => updateFormData({ casNumber: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., 8024-37-1"
          />
          <p className="text-xs text-gray-500 mt-1">Chemical Abstracts Service number</p>
        </div>
      </div>

      {/* Compliance Checkboxes */}
      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Regulatory Compliance</h3>
        
        <label className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700 cursor-pointer hover:border-gray-600">
          <input
            type="checkbox"
            checked={formData.fssaiApproved}
            onChange={(e) => updateFormData({ fssaiApproved: e.target.checked })}
            className="w-4 h-4 text-emerald-600 bg-gray-800 border-gray-700 rounded focus:ring-emerald-500"
          />
          <div>
            <span className="text-white font-medium">FSSAI Approved</span>
            <p className="text-xs text-gray-400">Food Safety and Standards Authority of India</p>
          </div>
        </label>

        <label className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700 cursor-pointer hover:border-gray-600">
          <input
            type="checkbox"
            checked={formData.fdaApproved}
            onChange={(e) => updateFormData({ fdaApproved: e.target.checked })}
            className="w-4 h-4 text-emerald-600 bg-gray-800 border-gray-700 rounded focus:ring-emerald-500"
          />
          <div>
            <span className="text-white font-medium">FDA Approved</span>
            <p className="text-xs text-gray-400">US Food and Drug Administration</p>
          </div>
        </label>

        <label className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700 cursor-pointer hover:border-gray-600">
          <input
            type="checkbox"
            checked={formData.euCompliant}
            onChange={(e) => updateFormData({ euCompliant: e.target.checked })}
            className="w-4 h-4 text-emerald-600 bg-gray-800 border-gray-700 rounded focus:ring-emerald-500"
          />
          <div>
            <span className="text-white font-medium">EU Compliant</span>
            <p className="text-xs text-gray-400">European Union regulations compliant</p>
          </div>
        </label>
      </div>
    </div>
  );
}
