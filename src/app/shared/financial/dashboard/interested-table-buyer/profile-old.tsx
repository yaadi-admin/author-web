'use client';

import CalenderIcon from '@/components/icons/calendar';
import FilesIcon from '@/components/icons/files';
import React from 'react';
import { Button } from 'rizzui';
import { useRouter } from 'next/navigation';
import ChatSolidIcon from '@/components/icons/chat-solid';

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
        profilePicture?: string;
    };
    // Extended investor details
    strategicMatchMetrics?: {
        [key: string]: any;
    };
    financialBackgroundMetrics?: {
        fundsUnderManagement?: string;
        typicalCheckSizeRange?: string;
        [key: string]: any;
    };
    intelligenceMetrics?: {
        educationalBackground?: string;
        [key: string]: any;
    };
    experienceMetrics?: {
        totalNumberOfDeals?: number;
        exitSuccessRate?: number;
        repeatInvestmentRatio?: number;
        foundersPeerTestimonials?: string;
        [key: string]: any;
    };
    consensusSignalAggregatedScores?: {
        combinedInvestorRating?: number;
        [key: string]: any;
    };
    patienceMetrics?: {
        [key: string]: any;
    };
};

type InvestorProfileSubset = {
    investment_track_record?: string;
    business_experience?: string;
    geographic_preference?: string;
    investment_amount_range?: string;
    // Extended profile fields
    investment_stages?: string[];
    network_strength?: string;
    investor_personality?: {
        decision_making_style?: string;
        communication_style?: string;
        collaborative_nature?: string;
        risk_tolerance?: string;
        cultural_fit?: string;
    };
    business_building_expertise?: string;
    collaborative_approach?: boolean;
    investment_industries?: string[];
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

const InfoSection = ({ title, value }: { title: string; value: string | number | undefined }) => (
    <div style={{ marginBottom: '0.5rem' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#555' }}>{title}:</div>
        <div style={{ fontSize: '1rem', color: '#222' }}>{value}</div>
    </div>
);

export function InvestorMatchSummary({ data, chat }: { data: InvestorMatchDataSubset, chat: any }) {
    const { investor, investor_profile, matching_analysis, overall_match_score, assessmentNotes, createdAt } = data;
    const router = useRouter();
    const createdDate = new Date(createdAt.seconds * 1000).toLocaleString();

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
                        src={investor.data?.profilePicture || investor.generalInformation?.profilePicture || '/placeholder.png'}
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
                    <Button
                        variant="solid"
                        size="sm"
                        style={{
                            backgroundColor: '#0078D4',
                            color: '#fff',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'background-color 0.2s ease',
                        }}
                        onClick={() => alert('Schedule Meeting functionality coming soon!')}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#005A9E'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0078D4'}
                    >
                        <CalenderIcon style={{ marginRight: '0.75rem', width: '18px', height: '18px' }} />
                        Request Meeting
                    </Button>
                    <Button
                        variant="solid"
                        size="sm"
                        style={{
                            backgroundColor: '#0078D4',
                            color: '#fff',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'background-color 0.2s ease',
                        }}
                        onClick={() => router.push('/investor-files')}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#005A9E'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0078D4'}
                    >
                        <FilesIcon style={{ marginRight: '0.75rem', width: '18px', height: '18px' }} />
                        View Investor Files
                    </Button>
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

            {/* Investor Profile Additional Details Section */}
            <div
                style={{
                    background: '#fff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Investor Profile Details</h2>
                <InfoSection
                    title="Investment Stages"
                    value={investor_profile.investment_stages ? investor_profile.investment_stages.join(', ') : 'N/A'}
                />
                <InfoSection
                    title="Network Strength"
                    value={investor_profile.network_strength || 'N/A'}
                />
                <div style={{ marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#555' }}>Investor Personality:</div>
                    {investor_profile.investor_personality ? (
                        <ul style={{ marginLeft: '1rem', marginTop: '0.5rem', fontSize: '1rem', color: '#222' }}>
                            <li>Decision Making: {investor_profile.investor_personality.decision_making_style || 'N/A'}</li>
                            <li>Communication: {investor_profile.investor_personality.communication_style || 'N/A'}</li>
                            <li>Collaborative Nature: {investor_profile.investor_personality.collaborative_nature || 'N/A'}</li>
                            <li>Risk Tolerance: {investor_profile.investor_personality.risk_tolerance || 'N/A'}</li>
                            <li>Cultural Fit: {investor_profile.investor_personality.cultural_fit || 'N/A'}</li>
                        </ul>
                    ) : 'N/A'}
                </div>
                <InfoSection
                    title="Business Building Expertise"
                    value={investor_profile.business_building_expertise || 'N/A'}
                />
                <InfoSection
                    title="Collaborative Approach"
                    value={investor_profile.collaborative_approach ? 'Yes' : 'No'}
                />
                <InfoSection
                    title="Investment Industries"
                    value={investor_profile.investment_industries ? investor_profile.investment_industries.join(', ') : 'N/A'}
                />
            </div>

            {/* Investor Additional Details Section */}
            <div
                style={{
                    background: '#fff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Investor Details</h2>
                <InfoSection
                    title="Funds Under Management"
                    value={investor.financialBackgroundMetrics?.fundsUnderManagement || 'N/A'}
                />
                <InfoSection
                    title="Typical Check Size"
                    value={investor.financialBackgroundMetrics?.typicalCheckSizeRange || 'N/A'}
                />
                <InfoSection
                    title="Total Number of Deals"
                    value={investor.experienceMetrics?.totalNumberOfDeals || 'N/A'}
                />
                <InfoSection
                    title="Exit Success Rate"
                    value={investor.experienceMetrics?.exitSuccessRate ? investor.experienceMetrics.exitSuccessRate + '%' : 'N/A'}
                />
                <InfoSection
                    title="Repeat Investment Ratio"
                    value={investor.experienceMetrics?.repeatInvestmentRatio ? investor.experienceMetrics.repeatInvestmentRatio + '%' : 'N/A'}
                />
                <InfoSection
                    title="Educational Background"
                    value={investor.intelligenceMetrics?.educationalBackground || 'N/A'}
                />
                <InfoSection
                    title="Combined Investor Rating"
                    value={investor.consensusSignalAggregatedScores?.combinedInvestorRating || 'N/A'}
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
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            backgroundColor: '#0078D4',
                            color: '#fff',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'background-color 0.2s ease, transform 0.2s ease',
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
                        <ChatSolidIcon style={{ marginRight: '0.75rem', width: '18px', height: '18px' }} />
                        Chat
                    </button>
                    <button
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            backgroundColor: '#0078D4',
                            color: '#fff',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'background-color 0.2s ease, transform 0.2s ease',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#005A9E';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#0078D4';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        onClick={() => alert('Schedule Meeting functionality coming soon!')}
                    >
                        <CalenderIcon style={{ marginRight: '0.75rem', width: '18px', height: '18px' }} />
                        Request Meeting
                    </button>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#555' }}>
                    <div style={{ fontSize: '0.85rem', color: '#555', textAlign: 'center', marginTop: '1rem' }}>
                        <p>
                            Disclaimer: The information presented herein is for informational purposes only and does not constitute investment advice or a recommendation. Users are advised to exercise independent judgment and consult with a qualified professional prior to making any investment decisions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
