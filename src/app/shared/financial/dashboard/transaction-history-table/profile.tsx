'use client';

import CalenderIcon from '@/components/icons/calendar';
import FilesIcon from '@/components/icons/files';
import React from 'react';
import { Button } from 'rizzui';
import ModalButton from '@/app/shared/modal-button-profile';
import { routes } from '@/config/routes';
import EventForm from '@/app/shared/event-calendar/event-form-matches';
import { currentSession } from '@/config/session';

// Types remain the same
type MatchingAnalysis = {
    match: boolean;
    criteria: string;
    investor_focus: string;
    business_requirement: string;
    notes: string;
};

type InvestorDataSubset = {
    data?: any;
    generalInformation?: {
        investorName?: string;
        investorType?: string;
        geographicLocation?: string;
    };
};

type InvestorProfileSubset = {
    investment_track_record?: string;
    business_experience?: string;
    geographic_preference?: string;
    investment_amount_range?: string;
};

export type InvestorMatchDataSubset = {
    investor: InvestorDataSubset;
    investor_profile: InvestorProfileSubset;
    matching_analysis: MatchingAnalysis[];
    overall_match_score: number;
    assessmentNotes: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
};

// Reusable InfoSection with improved spacing and hierarchy
const InfoSection = ({ title, value }: { title: string; value: string | number | undefined }) => (
    <div style={{ marginBottom: '0.5rem' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#555' }}>{title}:</div>
        <div style={{ fontSize: '1rem', color: '#222' }}>{value}</div>
    </div>
);

// Main component with a scrollable container and hierarchy
export function InvestorMatchSummary({ data, chat }: { data: InvestorMatchDataSubset, chat: any }) {
    const { investor, investor_profile, matching_analysis, overall_match_score, assessmentNotes, createdAt } =
        data;
    const createdDate = new Date(createdAt.seconds * 1000).toLocaleString();
        const currentUser = currentSession() as any;

    return (
        <div
            style={{
                maxHeight: '98vh',
                overflowY: 'auto',
                padding: '2rem',
                fontFamily: 'Arial, sans-serif',
                background: '#f9f9f9',
            }}
        >
            {/* Header section with investor details */}
            <div
                style={{
                    background: '#fff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <img
                        src={investor.data.profilePicture}
                        alt="Investor Profile"
                        style={{
                            borderRadius: '50%',
                            marginRight: '1.5rem',
                            width: '120px',
                            height: '120px',
                            objectFit: 'cover',
                            border: '2px solid #0078D4',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        }}
                    />
                    <div>
                        <h1 style={{ margin: 0, fontSize: '2rem' }}>
                            {investor.generalInformation?.investorName || 'N/A'}
                        </h1>
                        <div style={{ marginTop: '0.5rem' }}>
                            <InfoSection
                                title="Investor Type"
                                value={investor.generalInformation?.investorType || 'N/A'}
                            />
                            <InfoSection
                                title="Location"
                                value={investor.generalInformation?.geographicLocation || 'N/A'}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <ModalButton
                        label="Schedule Meeting"
                        view={<EventForm participants={[data.investor.data.user, currentUser]} />}
                        customSize="900px"
                        className="mt-0 w-full @lg:w-auto"
                    />
                </div>
            </div>

            {/* Match summary section */}
            <div
                style={{
                    background: '#fff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Match Summary</h2>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <div
                        style={{
                            background:
                                overall_match_score > 79
                                    ? 'green'
                                    : overall_match_score > 59
                                        ? 'yellow'
                                        : overall_match_score < 50
                                            ? 'red'
                                            : '#0078D4',
                            color: '#fff',
                            borderRadius: '50%',
                            width: '80px',
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            marginRight: '1rem',
                        }}
                    >
                        {`${overall_match_score}%`}
                    </div>
                    <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#555' }}>
                            Created:
                        </div>
                        <div style={{ fontSize: '1rem', color: '#222' }}>
                            {new Date(createdAt.seconds * 1000).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Assessment Notes</h3>
                    <p style={{ fontSize: '1rem', lineHeight: '1.5', color: '#333' }}>{assessmentNotes}</p>
                </div>
            </div>

            {/* Investor Profile section */}
            <div
                style={{
                    background: '#fff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Investor Profile</h2>
                <InfoSection
                    title="Investment Track Record"
                    value={investor_profile.investment_track_record || 'N/A'}
                />
                <InfoSection
                    title="Business Experience"
                    value={investor_profile.business_experience || 'N/A'}
                />
                <InfoSection
                    title="Geographic Preference"
                    value={investor_profile.geographic_preference || 'N/A'}
                />
                <InfoSection
                    title="Investment Amount Range"
                    value={investor_profile.investment_amount_range || 'N/A'}
                />
            </div>

            {/* Matching Analysis Section */}
            <div
                style={{
                    background: '#fff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Matching Analysis</h2>
                {matching_analysis.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            border: '1px solid #e0e0e0',
                            padding: '1rem',
                            marginBottom: '1rem',
                            borderRadius: '6px',
                            backgroundColor: '#fafafa',
                        }}
                    >
                        <InfoSection title="Criteria" value={item.criteria} />
                        <InfoSection title="Match" value={item.match ? 'Yes' : 'No'} />
                        <InfoSection title="Investor Focus" value={item.investor_focus} />
                        <InfoSection title="Business Requirement" value={item.business_requirement} />
                        <div style={{ marginTop: '0.5rem' }}>
                            <strong style={{ fontSize: '0.9rem', color: '#555' }}>Notes:</strong>{' '}
                            <span style={{ fontSize: '1rem', color: '#333' }}>{item.notes}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Call-to-action button */}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1rem',
                        marginBottom: '0.5rem',
                    }}
                >
                    <button
                        style={{
                            padding: '0.75rem 2rem',
                            fontSize: '1rem',
                            backgroundColor: '#0078D4',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                            transition: 'background-color 0.3s ease, transform 0.2s ease',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#005A9E';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#0078D4';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        onClick={() => chat()}
                    >
                        Chat
                    </button>
                    <ModalButton
                        label="Schedule Meeting"
                        view={<EventForm participants={[data.investor.data.user, currentUser]} />}
                        customSize="900px"
                        className="mt-0 w-full @lg:w-auto"
                    />
                </div>
                <div style={{ fontSize: '0.85rem', color: '#555' }}>
                    <div style={{ fontSize: '0.85rem', color: '#555', textAlign: 'center', marginTop: '1rem' }}>
                        <p>
                            Disclaimer: The information presented herein is for informational purposes only and does not constitute investment advice or a recommendation. It is solely a representation of allocated data. Users are advised to exercise independent judgment and consult with a qualified professional prior to making any investment decisions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
