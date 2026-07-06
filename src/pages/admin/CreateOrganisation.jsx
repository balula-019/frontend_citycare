import { useState } from 'react';
import { createOrganisation } from '../../api/admin';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';

export default function CreateOrganisation() {
  const [form, setForm] = useState({
    organization_name: '', email: '', mobile: '', description: '',
    location_name: '', location_lat: '', location_long: '', organization_type: 'PUBLIC'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrganisation({ ...form, location_lat: parseFloat(form.location_lat)||0, location_long: parseFloat(form.location_long)||0 });
      setSuccess('Organisation created! Temporary password sent.');
      setForm({...form, organization_name:'', email:'', mobile:'', description:'', location_name:'', location_lat:'', location_long:''});
    } catch (err) { setError(err.message); }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Create Organisation</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border shadow-sm space-y-4">
        <Input label="Organisation Name" name="organization_name" required onChange={handleChange} value={form.organization_name} />
        <Input label="Email" name="email" type="email" required onChange={handleChange} value={form.email} />
        <Input label="Mobile" name="mobile" required onChange={handleChange} value={form.mobile} />
        <Input label="Description" name="description" onChange={handleChange} value={form.description} />
        <Input label="Location Name" name="location_name" onChange={handleChange} value={form.location_name} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Latitude" name="location_lat" onChange={handleChange} value={form.location_lat} />
          <Input label="Longitude" name="location_long" onChange={handleChange} value={form.location_long} />
        </div>
        <select name="organization_type" required className="w-full border rounded-xl px-4 py-2" onChange={handleChange} value={form.organization_type}>
          <option value="PUBLIC">Public</option>
          <option value="UNIVERSITY">University</option>
        </select>
        <Button type="submit" variant="primary" className="w-full">Create Organisation</Button>
      </form>
    </div>
  );
}