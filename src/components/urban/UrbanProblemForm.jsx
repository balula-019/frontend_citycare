import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, Loader2, MapPin, Trash2, Upload, X } from 'lucide-react';
import LocationPicker from '../shared/LocationPicker/components/LocationPicker';
import { PROBLEM_TYPES, problemTypeLabelKey } from '../../constants/problemTypes';
import { TANZANIA_REGIONS, regionLabel } from '../../constants/regions';

const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const MIN_DESCRIPTION = 15;

const EMPTY = {
  problemType: '',
  description: '',
  suggestedSolution: '',
  locationName: '',
  region: '',
  district: '',
  ward: '',
  latitude: null,
  longitude: null,
};

/**
 * One form for both reporting and correcting. In `edit` mode the photos
 * already stored can be marked for removal and only changed fields are sent.
 */
export default function UrbanProblemForm({
  mode = 'create',
  initialValues,
  submitting = false,
  onSubmit,
  onCancel,
}) {
  const { t } = useTranslation();

  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [photos, setPhotos] = useState([]);
  const [existingImages, setExistingImages] = useState(initialValues?.imageUrls || []);
  const [removedImages, setRemovedImages] = useState([]);
  const [errors, setErrors] = useState({});

  const isEdit = mode === 'edit';

  const previews = useMemo(() => photos.map((photo) => URL.createObjectURL(photo)), [photos]);

  // Object URLs must be released or the tab leaks them on every pick.
  useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [previews]);

  const totalPhotos = existingImages.length + photos.length;

  const setField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleLocation = useCallback(({ locationName, lat, lng }) => {
    setValues((prev) => ({
      ...prev,
      locationName: locationName || prev.locationName,
      latitude: lat,
      longitude: lng,
    }));
    setErrors((prev) => (prev.location ? { ...prev, location: undefined } : prev));
  }, []);

  const handleFiles = (event) => {
    const picked = Array.from(event.target.files || []);
    event.target.value = '';
    if (picked.length === 0) return;

    const room = MAX_PHOTOS - totalPhotos;
    const tooBig = picked.find((file) => file.size > MAX_PHOTO_BYTES);

    if (tooBig) {
      setErrors((prev) => ({
        ...prev,
        photos: t('cc.form.errors.photoTooBig', 'Each photo must be smaller than 5 MB.'),
      }));
      return;
    }

    if (room <= 0) {
      setErrors((prev) => ({
        ...prev,
        photos: t('cc.form.errors.tooManyPhotos', 'You can attach at most five photos.'),
      }));
      return;
    }

    setPhotos((prev) => [...prev, ...picked.slice(0, room)]);
    setErrors((prev) => ({ ...prev, photos: undefined }));
  };

  const removeNewPhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingPhoto = (url) => {
    setExistingImages((prev) => prev.filter((item) => item !== url));
    setRemovedImages((prev) => [...prev, url]);
  };

  const validate = () => {
    const next = {};

    if (!values.problemType) {
      next.problemType = t('cc.form.errors.problemType', 'Choose what kind of problem this is.');
    }
    if (!values.description || values.description.trim().length < MIN_DESCRIPTION) {
      next.description = t(
        'cc.form.errors.description',
        'Describe the problem in at least 15 characters so the AI can match it to your photo.',
      );
    }
    if (!values.region) {
      next.region = t('cc.form.errors.region', 'Select the region.');
    }
    if (!values.district || !values.district.trim()) {
      next.district = t('cc.form.errors.district', 'Enter the district.');
    }
    if (values.latitude == null || values.longitude == null) {
      next.location = t('cc.form.errors.location', 'Pick the exact spot on the map.');
    }
    if (!isEdit && photos.length === 0) {
      next.photos = t('cc.form.errors.photoRequired', 'Attach at least one photo of the problem.');
    }
    if (totalPhotos === 0) {
      next.photos = t('cc.form.errors.photoRequired', 'Attach at least one photo of the problem.');
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const payload = {
      problemType: values.problemType,
      description: values.description.trim(),
      suggestedSolution: values.suggestedSolution?.trim() || null,
      locationName: values.locationName?.trim() || null,
      region: values.region,
      district: values.district.trim(),
      ward: values.ward?.trim() || null,
      latitude: values.latitude,
      longitude: values.longitude,
    };

    if (isEdit && removedImages.length > 0) {
      payload.removeImageUrls = removedImages;
    }

    onSubmit(payload, photos);
  };

  const regionOptions = useMemo(
    () =>
      TANZANIA_REGIONS.map((region) => ({
        value: region,
        label: regionLabel(region),
      })),
    [],
  );

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-5">
      {/* Problem */}
      <div className="space-y-8 lg:col-span-3">
        <section className="rounded-2xl border border-border bg-white p-6">
          <h2 className="mb-1 text-lg font-bold text-dark">
            {t('cc.form.problemHeading', 'What is the problem?')}
          </h2>
          <p className="mb-5 text-sm text-muted">
            {t(
              'cc.form.problemHelp',
              'The type you choose is what the photo is checked against, so pick the closest one.',
            )}
          </p>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {PROBLEM_TYPES.map((type) => {
              const active = values.problemType === type.value;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setField('problemType', type.value)}
                  aria-pressed={active}
                  className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm font-medium transition-colors ${
                    active
                      ? 'border-primary bg-primary-soft text-primary'
                      : 'border-border bg-white text-dark hover:border-primary/40'
                  }`}
                >
                  <type.icon size={17} className={active ? 'text-primary' : 'text-muted'} />
                  <span className="leading-tight">
                    {t(problemTypeLabelKey(type.value), type.label)}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.problemType && <p className="mt-2 text-sm text-danger">{errors.problemType}</p>}

          <div className="mt-6">
            <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-dark">
              {t('cc.form.description', 'Describe what you see')}
              <span className="ml-0.5 text-danger">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              value={values.description}
              onChange={(event) => setField('description', event.target.value)}
              placeholder={t(
                'cc.form.descriptionPlaceholder',
                'A deep pothole across both lanes near the bus stop, filling with water when it rains.',
              )}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-dark outline-none transition-colors placeholder:text-muted/70 focus:border-primary focus:bg-white"
            />
            <div className="mt-1 flex items-center justify-between">
              {errors.description ? (
                <p className="text-sm text-danger">{errors.description}</p>
              ) : (
                <p className="text-xs text-muted">
                  {t('cc.form.descriptionHint', 'Your photo is compared against this text.')}
                </p>
              )}
              <span className="text-xs text-muted">{values.description.length}</span>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="solution" className="mb-1.5 block text-sm font-semibold text-dark">
              {t('cc.form.solution', 'What would fix it?')}
              <span className="ml-1.5 text-xs font-normal text-muted">
                {t('cc.form.optional', '(optional)')}
              </span>
            </label>
            <input
              id="solution"
              type="text"
              value={values.suggestedSolution}
              onChange={(event) => setField('suggestedSolution', event.target.value)}
              placeholder={t('cc.form.solutionPlaceholder', 'Fill and reseal the damaged section.')}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-dark outline-none transition-colors placeholder:text-muted/70 focus:border-primary focus:bg-white"
            />
          </div>
        </section>

        {/* Photos */}
        <section className="rounded-2xl border border-border bg-white p-6">
          <h2 className="mb-1 text-lg font-bold text-dark">
            {t('cc.form.photosHeading', 'Photos')}
          </h2>
          <p className="mb-5 text-sm text-muted">
            {t(
              'cc.form.photosHelp',
              'The first photo is the one the AI checks. Up to five, 5 MB each.',
            )}
          </p>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {existingImages.map((url) => (
              <div key={url} className="group relative aspect-square overflow-hidden rounded-xl border border-border">
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeExistingPhoto(url)}
                  aria-label={t('cc.form.removePhoto', 'Remove photo')}
                  className="absolute right-1.5 top-1.5 rounded-lg bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}

            {previews.map((url, index) => (
              <div
                key={url}
                className="group relative aspect-square overflow-hidden rounded-xl border border-primary/40"
              >
                <img src={url} alt="" className="h-full w-full object-cover" />
                {index === 0 && existingImages.length === 0 && (
                  <span className="absolute bottom-1.5 left-1.5 rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                    {t('cc.form.checked', 'Checked')}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeNewPhoto(index)}
                  aria-label={t('cc.form.removePhoto', 'Remove photo')}
                  className="absolute right-1.5 top-1.5 rounded-lg bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                >
                  <X size={13} />
                </button>
              </div>
            ))}

            {totalPhotos < MAX_PHOTOS && (
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border bg-surface text-muted transition-colors hover:border-primary hover:text-primary">
                <Upload size={20} />
                <span className="text-xs font-medium">{t('cc.form.addPhoto', 'Add')}</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFiles}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {errors.photos && <p className="mt-3 text-sm text-danger">{errors.photos}</p>}
          {isEdit && removedImages.length > 0 && (
            <p className="mt-3 text-xs text-muted">
              {t('cc.form.photosToRemove', '{{count}} photo(s) will be removed when you save.', {
                count: removedImages.length,
              })}
            </p>
          )}
        </section>
      </div>

      {/* Location */}
      <div className="space-y-6 lg:col-span-2">
        <section className="rounded-2xl border border-border bg-white p-6">
          <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-dark">
            <MapPin size={18} className="text-primary" />
            {t('cc.form.locationHeading', 'Where is it?')}
          </h2>
          <p className="mb-5 text-sm text-muted">
            {t(
              'cc.form.locationHelp',
              'Search, use your current position, or drag the pin. The authority is chosen by how close it is to this point.',
            )}
          </p>

          <LocationPicker
            onChange={handleLocation}
            locationName={values.locationName}
            initialLat={values.latitude ?? undefined}
            initialLng={values.longitude ?? undefined}
            placeholder={t('cc.form.searchLocation', 'Search for a street, ward or landmark…')}
          />
          {errors.location && <p className="mt-2 text-sm text-danger">{errors.location}</p>}

          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="region" className="mb-1.5 block text-sm font-semibold text-dark">
                {t('cc.form.region', 'Region')}
                <span className="ml-0.5 text-danger">*</span>
              </label>
              <select
                id="region"
                value={values.region}
                onChange={(event) => setField('region', event.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-primary focus:bg-white"
              >
                <option value="">{t('cc.form.selectRegion', 'Select a region')}</option>
                {regionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.region && <p className="mt-1 text-sm text-danger">{errors.region}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="district" className="mb-1.5 block text-sm font-semibold text-dark">
                  {t('cc.form.district', 'District')}
                  <span className="ml-0.5 text-danger">*</span>
                </label>
                <input
                  id="district"
                  type="text"
                  value={values.district}
                  onChange={(event) => setField('district', event.target.value)}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-primary focus:bg-white"
                />
                {errors.district && <p className="mt-1 text-sm text-danger">{errors.district}</p>}
              </div>
              <div>
                <label htmlFor="ward" className="mb-1.5 block text-sm font-semibold text-dark">
                  {t('cc.form.ward', 'Ward')}
                </label>
                <input
                  id="ward"
                  type="text"
                  value={values.ward}
                  onChange={(event) => setField('ward', event.target.value)}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-primary focus:bg-white"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {isEdit
                  ? t('cc.form.saving', 'Saving…')
                  : t('cc.form.checkingPhoto', 'Checking your photo…')}
              </>
            ) : (
              <>
                <Camera size={18} />
                {isEdit
                  ? t('cc.form.saveChanges', 'Save changes')
                  : t('cc.form.submit', 'Send report')}
              </>
            )}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-xl border-2 border-border bg-white px-6 py-3.5 font-semibold text-dark transition-colors hover:border-primary hover:text-primary disabled:opacity-60"
            >
              {t('cc.form.cancel', 'Cancel')}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
