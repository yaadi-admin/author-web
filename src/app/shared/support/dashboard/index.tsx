import StatCards from '@/app/shared/support/dashboard/stat-cards';
import ProblemTypes from '@/app/shared/support/dashboard/problem-types';
import TicketActivity from '@/app/shared/support/dashboard/ticket-activity';
import CustomerWithMostTickets from '@/app/shared/support/dashboard/customer-with-most-tickets';
import ResponseRate from '@/app/shared/support/dashboard/response-rate';
import EmployeesActivity from '@/app/shared/support/dashboard/employees-activity';
import TicketsTable from '@/app/shared/support/dashboard/tickets';
import CustomerType from '@/app/shared/support/dashboard/customer-type';
import SatisfactionRate from '@/app/shared/support/dashboard/satisfaction-rate';
import CustomerTimezone from '@/app/shared/support/dashboard/customer-timezone';
import MessageDetails from '@/app/shared/support/inbox/message-details'
import Chat from '@/app/shared/support/inbox/chat';

export default function SupportDashboard() {
  return (
    <div className="@container">
      <Chat />
    </div>
  );
}
