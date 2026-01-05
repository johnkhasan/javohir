<td>
          <tr class="h-screen">
            <td class="border-line border border-y-0">
              <div class="mx-auto mt-10 max-w-md rounded-lg p-6 ">
                <form class="space-y-4">
                  <!-- Name Field -->
                  <div>
                    <label for="name" class="block text-sm font-medium">_name</label>
                    <input
                      type="text"
                      id="name"
                      v-model="message.name"
                      placeholder="Your Name"
                      class="border-line bg-primary-300 focus:border-secondary-100 mt-1 block w-full rounded-md border px-4 py-2 text-sm outline-none focus:ring-blue-400"
                    />
                  </div>

                  <!-- Email Field -->
                  <div>
                    <label for="email" class="block text-sm font-medium">_email</label>
                    <input
                      v-model="message.email"
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                      class="border-line bg-primary-300 focus:border-secondary-100 mt-1 block w-full rounded-md border px-4 py-2 outline-none focus:ring-blue-400"
                    />
                  </div>

                  <!-- Message Field -->
                  <div>
                    <label for="message" class="block text-sm font-medium">_message</label>
                    <textarea
                      id="message"
                      rows="4"
                      v-model="message.message"
                      placeholder="Write your message..."
                      class="border-line bg-primary-300 focus:border-secondary-100 mt-1 block w-full resize-none rounded-md border px-4 py-2 outline-none focus:ring-blue-400 sm:text-sm"
                    ></textarea>
                  </div>

                  <!-- Button Group -->

                  <button
                    @click.prevent="sendMessage"
                    class="bg-secondary-150 focus:outline-secondary-100 focus:ring-secondary-100 focus-visible:ring-secondary-100 rounded-md border-0 border-none px-4 py-1 text-white outline-none hover:bg-gray-600 focus:outline-none focus-visible:ring-2 active:border-none"
                  >
                    submit-message
                  </button>
                </form>
              </div>
            </td>
            <td>
              <pre class="code-block line-numbers bg-gray-200 pl-12">
<code ref="codeBlock" class="language-javascript">{{ code }}</code>
</pre>
            </td>
          </tr>
        </td>