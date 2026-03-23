import { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components//ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const drinkOptions = [
  { id: "vodka", label: "Водка" },
  { id: "shampanskoe", label: "Шампанское" },
  { id: "wine_red", label: "Вино красное" },
  { id: "wine_white", label: "Вино белое" },
  { id: "viski", label: "Виски" },
  { id: "konjak", label: "Коньяк" },
  { id: "none", label: "Не пью" },
] as const;

interface FormDataProps {
  name: string;
  attending: string;
  food: string[];
  drinks: string[];
  transfer: string;
  staySecondDay: string;
}

const initialFormState: FormDataProps = {
  name: "",
  attending: "yes",
  food: [],
  drinks: [],
  transfer: "",
  staySecondDay: "",
};

// Выносим константы за пределы компонента
const SUBMIT_URL =
  import.meta.env.VITE_APPS_URL ||
  "https://script.google.com/macros/s/AKfycbywmOlY_8xHU4uSHt2v1s1gk0Ei1IwSCQEFs9V4FYed1rjaat_-Q-BEp0ovLA779-6M/exec";

export const RsvpForm = () => {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState<FormDataProps>(initialFormState);
  const [formFillTime, setFormFillTime] = useState<number>(0);

  // Мемоизируем userAgent, так как он не меняется
  const userAgent = useMemo(() => navigator.userAgent, []);

  useEffect(() => {
    setFormFillTime(Date.now());
  }, []);

  // Мемоизируем функцию сброса формы
  const resetForm = useCallback(() => {
    setFormData(initialFormState);
  }, []);

  // Оптимизированная функция валидации с useMemo
  const isFormValid = useMemo(() => {
    // Ранний выход при отсутствии имени
    if (!formData.name || formData.name.trim().length < 5) {
      return false;
    }

    if (!formData.attending) {
      return false;
    }

    // Если гость не приходит, форма валидна
    if (formData.attending === "no") {
      return true;
    }

    // Для приходящих гостей проверяем напитки
    return formData.drinks.length > 0;
  }, [formData.name, formData.attending, formData.drinks.length]);

  // Оптимизированный обработчик отправки
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Дополнительная проверка перед отправкой
      if (!isFormValid) return;

      setStatus("submitting");

      try {
        const fillTime = Date.now() - formFillTime;

        await fetch(SUBMIT_URL, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({
            ...formData,
            formFillTime: fillTime,
            userAgent,
            timestamp: Date.now(),
          }),
        });

        setStatus("success");
        resetForm();
      } catch (err) {
        console.error("Submit error:", err);
        setStatus("error");
        alert("Произошла ошибка при отправке. Попробуйте еще раз.");
      }
    },
    [formData, formFillTime, userAgent, resetForm, isFormValid],
  );

  // Оптимизированный обработчик изменения полей
  const handleFieldChange = useCallback(
    <K extends keyof FormDataProps>(field: K, value: FormDataProps[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  // Оптимизированный обработчик чекбоксов
  const handleCheckboxChange = useCallback(
    (field: keyof FormDataProps, label: string) => {
      setFormData((prev) => {
        const currentItems = prev[field] as string[];
        const isSelected = currentItems.includes(label);

        return {
          ...prev,
          [field]: isSelected
            ? currentItems.filter((item) => item !== label)
            : [...currentItems, label],
        };
      });
    },
    [],
  );

  // Мемоизируем опции напитков, чтобы они не создавались заново
  const drinkOptionsList = useMemo(() => drinkOptions, []);

  // Мемоизируем компонент успешной отправки
  const SuccessBanner = useMemo(
    () => (
      <div className="text-center py-10 rsvp-success-banner">
        <h3 className="text-2xl font-serif text-[#d1bfa7]">
          Анкета отправлена! Благодарим за ответ!
        </h3>
        <p className="text-gray-500 mt-2">Мы очень ждем встречи с вами.</p>
        <Button
          variant="ghost"
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs uppercase tracking-widest"
        >
          Отправить еще раз
        </Button>
      </div>
    ),
    [],
  );

  // Мемоизируем дополнительные поля формы (для приходящих гостей)
  const AdditionalFields = useMemo(() => {
    if (formData.attending !== "yes") return null;

    return (
      <div className="space-y-6">
        {/* Блок АЛКОГОЛЬ */}
        <div className="space-y-3">
          <Label className="text-gray-400 uppercase text-[10px] tracking-[0.2em]">
            Напитки (выберите хотя бы один вариант)
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {drinkOptionsList.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:border-[#d1bfa7] transition-colors"
              >
                <Checkbox
                  id={option.id}
                  checked={formData.drinks.includes(option.label)}
                  onCheckedChange={() =>
                    handleCheckboxChange("drinks", option.label)
                  }
                />
                <label
                  htmlFor={option.id}
                  className="text-sm cursor-pointer select-none"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          {formData.drinks.length === 0 && (
            <p className="text-xs text-red-500 mt-1">
              Пожалуйста, выберите хотя бы один напиток
            </p>
          )}
        </div>

        <p className="text-[12px] text-gray-500 leading-snug text-left italic">
          Поля ниже можете оставить пустыми, решите позже и лично сообщите
        </p>

        {/* Трансфер */}
        <div className="space-y-2">
          <Label className="text-gray-400 uppercase text-[10px] tracking-[0.2em]">
            Нужен трансфер (необязательно)
          </Label>
          <Select
            value={formData.transfer}
            onValueChange={(val) => handleFieldChange("transfer", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите вариант" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Да, нужен</SelectItem>
              <SelectItem value="no">Нет, не нужен</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 2-й день */}
        <div className="space-y-2">
          <Label className="text-gray-400 uppercase text-[10px] tracking-[0.2em]">
            Останусь на 2-й день (необязательно)
          </Label>
          <Select
            value={formData.staySecondDay}
            onValueChange={(val) => handleFieldChange("staySecondDay", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите вариант" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Да</SelectItem>
              <SelectItem value="no">Нет</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }, [
    formData.attending,
    formData.drinks,
    formData.transfer,
    formData.staySecondDay,
    drinkOptionsList,
    handleCheckboxChange,
    handleFieldChange,
  ]);

  // Мемоизируем кнопку отправки
  const SubmitButton = useMemo(
    () => (
      <Button
        className={`w-full bg-[#d1bfa7] hover:bg-[#c4af94] text-white py-6 text-lg transition-all duration-300 ${
          !isFormValid ? "opacity-50 cursor-not-allowed" : ""
        }`}
        type="submit"
        disabled={status === "submitting" || !isFormValid}
      >
        {status === "submitting" ? "Отправка..." : "Отправить ответ"}
      </Button>
    ),
    [status, isFormValid],
  );

  // Мемоизируем основную форму
  const FormFields = useMemo(
    () => (
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm font-medium uppercase tracking-wider text-gray-500"
          >
            Ваше имя
          </Label>
          <Input
            id="name"
            className="border-gray-200 focus:ring-beige-500"
            placeholder="Имя Фамилия"
            required
            minLength={5}
            value={formData.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
          />
          {formData.name && formData.name.trim().length < 5 && (
            <p className="text-xs text-red-500 mt-1">
              Имя должно содержать минимум 5 символов
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Присутствие
          </Label>
          <Select
            value={formData.attending}
            onValueChange={(val) => handleFieldChange("attending", val)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите ответ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Буду присутствовать</SelectItem>
              <SelectItem value="no">Прийти не получится</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {AdditionalFields}
        {SubmitButton}
      </form>
    ),
    [
      formData.name,
      formData.attending,
      AdditionalFields,
      SubmitButton,
      handleFieldChange,
      handleSubmit,
    ],
  );

  return (
    <section className="py-20 px-4 bg-[#fdfaf7]">
      <Card className="max-w-md mx-auto border-none shadow-xl bg-white/80 backdrop-blur-sm py-6">
        <CardHeader>
          <CardTitle className="text-3xl font-serif text-center">
            Анкета гостя
          </CardTitle>
        </CardHeader>
        <CardContent>
          {status === "success" ? SuccessBanner : FormFields}
        </CardContent>
      </Card>
    </section>
  );
};
