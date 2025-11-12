import { useForm } from "react-hook-form";

function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm();



    function SubmitFun(data) {
        console.log(data);
    }

    return (
        <div>
            <h1>Form using useForm hook</h1>
            <form onSubmit={handleSubmit(SubmitFun)}>
                <div>
                    <label>User name :</label>
                    <input
                        type="text"
                        {...register("username", {
                            required: "Username is required",
                            maxLength: { value: 10, message: "Max length is 10" },
                            minLength: { value: 3, message: "Min length is at least 3" }
                        })}
                    />
                    {errors.username && <p>{console.log(errors.username)}</p>}
                </div>
                <div>
                    <label>Last name :</label>
                    <input type="text" {...register("lastname")} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form;