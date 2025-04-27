
public class MajorityElement {
    static void display(int[] arr) {
        for(int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]+" ");
        }
        System.out.println();
    }

    // Brute force approch
    public static int majorityElement(int[] nums) {
        int n = nums.length;

        for(int i = 0; i < n; i++) {
            int count = 0;

            for(int j = 0; j < n; j++) {
                if(nums[i] == nums[j]) {
                    count++;
                }
            }

            if(count > n / 2) {
                return nums[i];
            }
        }

        return -1;
    }

    //  optimal approch
    static int majorityEle(int[] nums) {
        int count = 0;
        int cand = 0;
        for(int i = 0; i < nums.length; i++) {
            if(count == 0) cand = nums[i];
            if(nums[i] == cand) count++;
            else count--;
        }
        return cand;
    }

    public static void main(String[] args) {
        int[] nums = {2,2,1,1,1,2,2};
        display(nums);
        int result = majorityElement(nums);
        System.out.println(result);
        System.out.println(majorityEle(nums));
    }
}