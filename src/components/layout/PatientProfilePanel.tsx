import { Button } from "@/components/ui/button";
import type { Patient } from "@/lib/api";
import { BirthIcon, FemaleIcon, PhoneIcon, InsuranceIcon } from "@/assets/icons";

interface PatientProfilePanelProps {
  patient: Patient;
}

export function PatientProfilePanel({ patient }: PatientProfilePanelProps) {
  const formatDateOfBirth = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="w-full max-w-full xl:min-w-[240px] xl:max-w-[367px] card-base card-padding">
      <div className="flex flex-col items-center mb-6">
        <div className="max-w-[200px]">
          <img
            src={patient.profile_picture}
            alt={patient.name}
            className="profile-avatar mb-4"
          />
        </div>

        <h2 className="text-subtitle">{patient.name}</h2>
      </div>

      <div className="space-y-1 mb-6">
        <div className="info-row mb-6">
          <img src={BirthIcon} alt="" className="info-icon mt-0.5" />
          <div>
            <p className="info-label">Date Of Birth</p>
            <p className="info-value">{formatDateOfBirth(patient.date_of_birth)}</p>
          </div>
        </div>
        <div className="info-row mb-6">
          <img src={FemaleIcon} alt="" className="info-icon mt-0.5" />
          <div>
            <p className="info-label">Gender</p>
            <p className="info-value">{patient.gender}</p>
          </div>
        </div>
        <div className="info-row mb-6">
          <img src={PhoneIcon} alt="" className="info-icon mt-0.5" />
          <div>
            <p className="info-label">Contact Info</p>
            <p className="info-value">{patient.phone_number}</p>
          </div>
        </div>
        <div className="info-row mb-6">
          <img src={PhoneIcon} alt="" className="info-icon mt-0.5" />
          <div>
            <p className="info-label">Emergency Contacts</p>
            <p className="info-value">{patient.emergency_contact}</p>
          </div>
        </div>
        <div className="info-row mb-6">
          <img src={InsuranceIcon} alt="" className="info-icon mt-0.5" />
          <div>
            <p className="info-label">Insurance Provider</p>
            <p className="info-value">{patient.insurance_type}</p>
          </div>
        </div>
      </div>

      <Button
        className="cta-button"
        style={{ maxWidth: '220px', width: '100%', height: '41px', background: '#01F0D0', borderRadius: '41px', color: '#072635' }}
      >
        Show All Information
      </Button>
    </div>
  );
}