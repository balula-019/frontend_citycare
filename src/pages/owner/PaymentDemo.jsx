// PaymentDemo
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';

export default function PaymentDemo() {
  const location = useLocation();
  const details = location.state;
  const navigate = useNavigate();

  const handlePay = () => {
    // Simulate payment
    alert('Payment successful! Organization notified.');
    navigate('/owner/dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-16">
      <h2 className="text-2xl font-bold mb-6">Demo Payment</h2>
      <div className="bg-white p-8 rounded-2xl shadow border">
        <p>Paying <strong>{details?.organizationName}</strong></p>
        <p className="text-3xl font-bold text-primary mt-4">TZS {details?.amountToPay}</p>
        <Button onClick={handlePay} className="w-full mt-8">Pay Now (Demo)</Button>
      </div>
    </div>
  );
}